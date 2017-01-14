let db;

exports.run = (client, msg, [action, ...contents]) => {
  if(!client.dataProviders.has("sqlite")) return msg.reply("this command requires the `sqlite` module which is not present.");
  if(!contents && ["add", "delete"].includes(action)) return msg.reply("you must provide a name for this action.");

  if(!action) {
    return db.getAll(client, "tags")
    .then(rows => {
      msg.channel.sendMessage("**List of tags**: ```" + rows.map(r=>r.name).join(" | ") + "```");
    });
  }

  if(action === "add") {
    db.insert(client, "tags", ["name", "count", "contents"], [contents[0], 0, contents.slice(1).join(" ")])
    .then(()=> {
      msg.reply(`The tag \`${contents[0]}\` has been added.`);
    }).catch(console.error);
    return;
  }

  if(action === "delete") {
    db.get(client, "tags", "name", action)
    .then(row => {
      if(!row) return msg.reply("this tag doesn't seem to exist.");
      db.delete(client, "tags", row.id)
      .then(() => {
        return msg.reply("the tag has been deleted. It's gone. For real, it no longer exists. It's pushing up the daisies.");
      })
      .catch(e => {
        return msg.reply("I wasn't able to delete the tag because of the following reason: \n" + e);
      });
    })
    .catch(e => {
      return msg.reply(e);
    });
  }

  if(action === "random") {
    return db.getRandom(client, "tags")
    .then(row => {
      msg.channel.sendMessage(row.contents);
      db.update(client, "tags", ["count"], [row.count++], "id", row.id);
    });
  }
  if(!["add", "delete", "random"].includes(action)) {
    db.get(client, "tags", "name", action).then(row => {
      msg.channel.sendMessage(row.contents);
      db.update(client, "tags", ["count"], [row.count++], "id", row.id);
    }).catch(e => {
      msg.reply("tag name not found.");
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tags"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "tag",
  description: "Server-Specific tags",
  usage: "[action:string] [contents:string] [...]",
  usageDelim: " ",
};

exports.init = (client) => {
  if (!client.dataProviders.has("sqlite")) {
    console.log("tag Command: No Database Found");
  }
  db = client.dataProviders.get("sqlite");
  db.hasTable(client, "tags")
    .then(res => {
      if (!res) {
        let keys = "<name:str> <count:int> <contents:str> <enabled:bool> <embed:bool> <title:str> <footer:str>";
        db.createTable(client, "tags", keys).catch(console.error);
      }
      client.config.init.push("tags");
    });
};
