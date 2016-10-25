exports.run = (client, msg, [user]) => {
  msg.channel.sendMessage(`:bell: SHAME :bell: ${user} :bell: SHAME :bell:`).catch(error => console.log(error.stack));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "shame",
  description: "Rings a bell on the server shaming the mentioned person",
  usage: "<user:user>",
  usageDelim: ""
};
