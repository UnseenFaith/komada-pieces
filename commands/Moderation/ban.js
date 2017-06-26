exports.run = async (client, msg, [member]) => {
  await msg.guild.ban(member);
  return msg.channel.send(`${member.user.tag} was banned.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["b"],
  permLevel: 3,
  botPerms: ["BAN_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "ban",
  description: "Bans a mentioned user. Currently does not require reason (no mod-log)",
  usage: "<member:member>",
  usageDelim: "",
  type: "commands",
};
