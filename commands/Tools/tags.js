exports.providerEngine = "json";

exports.init = async (client) => {
  if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
  else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
  if (!(await this.provider.hasTable("tags"))) {
    const SQLCreate = ["count INTEGER NOT NULL DEFAULT 0", "id TEXT NOT NULL UNIQUE", "contents TEXT NOT NULL", "guild TEXT NOT NULL"];
    await this.provider.createTable("tags", SQLCreate);
  }
};

exports.run = async (client, msg, [action, ...contents]) => {
  contents = contents[0] ? contents.join(" ") : null;
  switch (action) {
    case "add": {
      const row = await this.provider.get("tags", contents);
      if (row) return msg.reply("this tag already exists.");
      await this.provider.insert("tags", contents.split(" ")[0], { count: 0, contents: contents.split(" ").slice(1).join(" "), guild: msg.guild.id });
      return msg.reply(`The tag \`${contents.split(" ")[0]}\` has been added.`);
    }
    case "delete": {
      const row = await this.provider.get("tags", contents);
      if (!row) return msg.reply("this tag doesn't seem to exist.");
      if (row.guild !== msg.guild.id) return msg.reply("this tag doesn't seem to exist.");
      await this.provider.delete("tags", row.id).catch(e => msg.reply(`I wasn't able to delete the tag because of the following reason: \n${e}`));
      return msg.reply("the tag has been deleted. It's gone. For real, it no longer exists. It's pushing up the daisies.");
    }
    case "random": {
      const row = await this.provider.getAll("tags");
      // await this.provider.update("tags", row.id, { count: row.count + 1 });
      const tags = []
      row.forEach((r => {
        if (r.guild === msg.guild.id) {
          tags.push(r.contents)
        }
      }))
      return msg.channel.send(tags[Math.floor(Math.random() * tags.length)]);
    }
    default: {
      if (!contents) {
        const rows = await this.provider.getAll("tags");
        if (rows[0] === undefined) return msg.channel.send("There is no tag available.");
        const tags = []
        rows.forEach((r => {
          if (r.guild === msg.guild.id) {
            tags.push(r.id)
          }
        }))
        return msg.channel.send(`**List of tags**: \`\`\`${tags.join(" | ")}\`\`\``);
      }
      const row = await this.provider.get("tags", contents);
      if (!row) return msg.reply("tag name not found.");
      await this.provider.update("tags", row.id, { count: row.count + 1 });
      if (row.guild !== msg.guild.id) return msg.channel.send("That tag doesn't exist here")
      return msg.channel.send(row.contents);
    }
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["tag", "facts"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "tags",
  description: "Server-Specific tags",
  usage: "[add|delete|random] [contents:string] [...]",
  usageDelim: " ",
  type: "commands",
};
