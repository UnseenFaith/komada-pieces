exports.exist = (client, msg) => new Promise((resolve, reject) => {
  if (!msg.guildConf.pins) {
    if (!msg.guild.channels.exists("name", "pins")) reject("Please create the _pins_ channel and try again.");
    else {
      client.funcs.confs.set("pins", msg.guild.channels.find("name", "pins").id);
      resolve();
    }
  } else resolve();
});

exports.run = async (client, msg, [message]) => {
  const moment = require("moment"); // eslint-disable-line global-require
  try {
    await this.exist(client, msg);
    client.channels.get(msg.guildConf.pins).send(`:pushpin: **${message.author.username}#${message.author.discriminator}** in #${message.channel.name} - ${moment(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")}\n${message.cleanContent}`);
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
