const moment = require("moment");

exports.exist = (client, msg) => {
  if (!msg.guildConf.pins) {
    if (!msg.guild.channels.exists("name", "pins")) throw "Please create the _pins_ channel and try again.";
    return client.funcs.confs.set("pins", msg.guild.channels.find("name", "pins").id);
  }
  return null;
};

exports.run = async (client, msg, [message]) => {
  try {
    await this.exist(client, msg);
    client.channels.get(msg.guildConf.pins).send(`:pushpin: **${message.author.tag}** in #${message.channel.name} - ${moment(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")}\n${message.cleanContent}`);
  } catch (e) {
    msg.reply(e);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["note"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["moment"],
};

exports.help = {
  name: "pin",
  description: "Pin messages to a set channel.",
  usage: "<messageid:msg>",
  usageDelim: "",
  type: "commands",
};

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("pins")) client.funcs.confs.addKey("pins", "");
};
