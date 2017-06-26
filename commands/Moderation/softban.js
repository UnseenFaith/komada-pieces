exports.run = async (client, msg, [member, days = 1]) => {
  await msg.guild.ban(member, days);
  await msg.guild.unban(member);
  return msg.channel.send(`${member.tag} was softbanned.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["sb"],
  permLevel: 3,
  botPerms: ["BAN_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "softban",
  description: "Bans a mentioned user. Currently does not require reason (no mod-log)",
  usage: "<member:member> [days:int{1,7}]",
  usageDelim: "",
  type: "commands",
};
