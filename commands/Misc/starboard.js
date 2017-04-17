exports.exist = (client, msg) => new Promise((resolve, reject) => {
  if (!msg.guildConf.starboard) {
    if (!msg.guild.channels.exists("name", "starboard")) reject("Please create the _starboard_ channel and try again.");
    else {
      client.funcs.confs.set(msg.guild, "starboard", msg.guild.channels.find("name", "starboard").id);
      resolve();
    }
  } else resolve();
});

exports.run = async (client, msg, [message]) => {
  const fsp = require("fs-promise"); // eslint-disable-line global-require
  const moment = require("moment"); // eslint-disable-line global-require
  require("moment-duration-format"); // eslint-disable-line global-require
  try {
    await this.exist(client, msg);
    if (!fsp.existsSync(`./data/${message.guild.id}.json`)) fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify([], null, "\t"));
    const star = message;
    const msgArray = JSON.parse(fsp.readFileSync(`./data/${message.guild.id}.json`, "utf8"));
    if (msgArray.includes(star.id)) await message.channel.send("This message has already been starred.");
    else if (msg.author === star.author) await message.channel.send("You cannot star yourself.");
    else if (star.attachments.first()) {
      const file = star.attachments.map(a => a.url).join(" ");
      await client.channels.get(msg.guildConf.starboard).sendFile(file, star.attachments.map(a => a.filename).join(" "), `${star.cleanContent} - ${moment(star.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")} by ${star.author.username}#${star.author.discriminator} in #${star.channel.name} (ID: ${star.id})`);
      msgArray.push(star.id);
      fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
      await message.addReaction("⭐");
      client.channels.get(msg.channel.id).send("Successfully starred!");
    } else {
      client.channels.get(msg.guildConf.starboard).send(`${star.cleanContent} - ${moment(star.timestamp).format("D[/]M[/]Y [@] HH:mm:ss")} by ${star.author.username}#${star.author.discriminator} in ${star.channel}, (ID: ${star.id})`);
      msgArray.push(star.id);
      fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
      await message.addReaction("⭐");
      client.channels.get(msg.channel.id).send("Successfully starred!");
    }
  } catch (e) {
    msg.reply(e);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["star"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["moment", "moment-duration-format", "fs-promise"],
};

exports.help = {
  name: "starboard",
  description: "Stars a message",
  usage: "<messageid:msg>",
  usageDelim: "",
  type: "commands",
};

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("starboard")) client.funcs.confs.addKey("starboard", "");
};
