exports.providerEngine = "json";

exports.init = async (client) => {
  if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
  if (!(await this.provider.hasTable("tags"))) await this.provider.createTable("tags");
};

exports.run = async (client, msg, [action, ...contents]) => {
  contents = contents[0] ? contents.join(" ") : null;
  switch (action) {
    case "add": {
      await this.provider.insert("tags", contents.split(" ")[0], { count: 0, contents: contents.split(" ").slice(1).join(" ") });
      return msg.reply(`The tag \`${contents[0]}\` has been added.`);
    }
    case "delete": {
      const row = await this.provider.get("tags", contents);
      if (!row) return msg.reply("this tag doesn't seem to exist.");
      await this.provider.delete("tags", row.id).catch(e => msg.reply(`I wasn't able to delete the tag because of the following reason: \n${e}`));
      return msg.reply("the tag has been deleted. It's gone. For real, it no longer exists. It's pushing up the daisies.");
    }
    case "random": {
      const row = await this.provider.getRandom("tags");
      await this.provider.update("tags", row.id, { count: row.count++ });
      return msg.channel.send(row.contents);
    }
    default: {
      if (contents) {
        const rows = await this.provider.getAll("tags");
        return msg.channel.send(`**List of tags**: \`\`\`${rows.map(r => r.name).join(" | ")}\`\`\``);
      }
      const row = await this.provider.get("tags", contents);
      if (!row) return msg.reply("tag name not found.");
      await this.provider.update("tags", row.id, { count: row.count++ });
      return msg.channel.send(row.contents);
    }
  }
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
  usage: "[add|delete|random] [contents:string] [...]",
  usageDelim: " ",
  type: "commands",
};
