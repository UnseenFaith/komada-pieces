exports.run = (client, msg, [user]) => {
  msg.guild.member(user).kick()
  .then(() => msg.channel.sendMessage(`${user.username}#${user.discriminator} was kicked.`))
  .catch(e => msg.reply(`There was an error trying to kick: ${e}`));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "kick",
  description: "Kicks a mentionned user. Currently does not require reason (no mod-log)",
  usage: "<user:user>",
  usageDelim: "",
};
