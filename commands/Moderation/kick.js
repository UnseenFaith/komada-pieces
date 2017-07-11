exports.run = async (client, msg, [member]) => {
  await member.kick();
  return msg.channel.send(`${member.user.tag} was kicked.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "kick",
  description: "Kicks a mentioned user. Currently does not require reason (no mod-log)",
  usage: "<member:member>",
  usageDelim: "",
  type: "commands",
};
