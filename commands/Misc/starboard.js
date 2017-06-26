const fsp = require("fs-extra-promise");
const moment = require("moment");
require("moment-duration-format");

exports.exist = (client, msg) => {
  if (!msg.guildConf.starboard) {
    if (!msg.guild.channels.exists("name", "starboard")) throw "Please create the _starboard_ channel and try again.";
    return client.funcs.confs.set(msg.guild, "starboard", msg.guild.channels.find("name", "starboard").id);
  }
  return null;
};

exports.run = async (client, msg, [message]) => {
  await this.exist(client, msg);
  if (!(await fsp.exists(`./data/${message.guild.id}.json`))) await fsp.writeFileAsync(`./data/${message.guild.id}.json`, JSON.stringify([], null, "\t"));
  const star = message;
  const msgArray = JSON.parse(await fsp.readFileAsync(`./data/${message.guild.id}.json`, "utf8"));
  if (msgArray.includes(star.id)) return message.channel.send("This message has already been starred.");
  else if (msg.author === star.author) return message.channel.send("You cannot star yourself.");
  else if (star.attachments.first()) {
    const file = star.attachments.map(a => a.url).join(" ");
    const starTime = moment(star.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss");
    const starFooter = `${star.author.tag} in #${star.channel.name} (ID: ${star.id})`;
    await client.channels.get(msg.guildConf.starboard).send(`${star.cleanContent} - ${starTime} by ${starFooter}`, {
      files: [{ attachment: file, name: star.attachments.map(a => a.filename).join(" ") }],
    });
    msgArray.push(star.id);
    await fsp.writeFileAsync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
    await message.addReaction("⭐");
    return client.channels.get(msg.channel.id).send("Successfully starred!");
  }
  client.channels.get(msg.guildConf.starboard).send(`${star.cleanContent} - ${moment(star.timestamp).format("D[/]M[/]Y [@] HH:mm:ss")} by ${star.author.username}#${star.author.discriminator} in ${star.channel}, (ID: ${star.id})`);
  msgArray.push(star.id);
  await fsp.writeFileAsync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
  await message.addReaction("⭐");
  return client.channels.get(msg.channel.id).send("Successfully starred!");
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["star"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["moment", "moment-duration-format", "fs-extra-promise"],
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
