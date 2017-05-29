let db;

exports.run = async (client, msg, [action, ...contents]) => {
  if (!client.providers.has("sqlite")) return msg.reply("this command requires the `sqlite` module which is not present.");
  if (!contents && ["add", "delete"].includes(action)) return msg.reply("you must provide a name for this action.");
  try {
    if (!action) {
      const rows = await db.getAll(client, "tags");
      return msg.channel.send(`**List of tags**: \`\`\`${rows.map(r => r.name).join(" | ")}\`\`\``);
    } else if (action === "add") {
      await db.insert(client, "tags", ["name", "count", "contents"], [contents[0], 0, contents.slice(1).join(" ")]);
      return msg.reply(`The tag \`${contents[0]}\` has been added.`);
    } else if (action === "delete") {
      const row = await db.get(client, "tags", "name", contents[0]);
      if (!row) return msg.reply("this tag doesn't seem to exist.");
      await db.delete(client, "tags", row.id).catch(e => msg.reply(`I wasn't able to delete the tag because of the following reason: \n${e}`));
      return msg.reply("the tag has been deleted. It's gone. For real, it no longer exists. It's pushing up the daisies.");
    } else if (action === "random") {
      const row = await db.getRandom(client, "tags");
      await msg.channel.send(row.contents);
      db.update(client, "tags", ["count"], [row.count++], "id", row.id);
    } else {
      const row = await db.get(client, "tags", "name", action).catch(() => msg.reply("tag name not found."));
      await msg.channel.send(row.contents);
      db.update(client, "tags", ["count"], [row.count++], "id", row.id);
    }
  } catch (e) {
    client.funcs.log(e, "error");
  }

  return this;
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["tags"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "tag",
  description: "Server-Specific tags",
  usage: "[action:string] [contents:string] [...]",
  usageDelim: " ",
  type: "commands",
};

exports.init = async (client) => {
  if (!client.providers.has("sqlite")) client.funcs.log("tag Command: No Database Found", "error");
  db = client.providers.get("sqlite");
  const res = await db.hasTable(client, "tags");
  if (!res) {
    const keys = "<name:str> <count:int> <contents:str> <enabled:bool> <embed:bool> <title:str> <footer:str>";
    db.createTable(client, "tags", keys).catch(e => client.funcs.log(e, "error"));
  }
  client.config.init.push("tags");
};
