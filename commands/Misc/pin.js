exports.init = (client) => {
  if (!client.funcs.confs.hasKey("pins")) {
    client.funcs.confs.addKey("pins", "");
  }
};


exports.run = (client, msg, [message]) => {
  if (!msg.guildConf.pins) {
    if (!msg.guild.channels.exists("name", "pins")) {
      msg.reply("Please create the _pins_ channel and try again.");
    } else {
      client.funcs.confs.set("pins", msg.guild.channels.find("name", "pins").id);
      client.channels.get(msg.guild.channels.find("name", "pins").id).sendMessage(`:pushpin: **${message.author.username}#${message.author.discriminator}** in #${message.channel.name} - ${require("moment")(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")}\n${message.cleanContent}`).catch(error => console.log(error.stack));
    }
  } else {
    client.channels.get(msg.guildConf.pins).sendMessage(`:pushpin: **${message.author.username}#${message.author.discriminator}** in #${message.channel.name} - ${require("moment")(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")}\n${message.cleanContent}`).catch(error => console.log(error.stack));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  selfbot: true,
  aliases: ["note"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "pin",
  description: "Pin messages to a set channel.",
  usage: "<messageid:msg>",
  usageDelim: ""
};
