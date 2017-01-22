exports.run = (client, msg, [user]) => {
  msg.channel.sendMessage(`🔔 SHAME 🔔 ${user} 🔔 SHAME 🔔`).catch(error => client.funcs.log(error.stack, "error"));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "shame",
  description: "Rings a bell on the server shaming the mentioned person",
  usage: "<user:mention>",
  usageDelim: "",
};
