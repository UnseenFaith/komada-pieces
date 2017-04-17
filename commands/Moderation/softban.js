exports.run = async (client, msg, [member, days = 1]) => {
  try {
    await msg.guild.ban(member, days);
    await msg.guild.unban(member);
    msg.channel.send(`${member.username}#${member.discriminator} was softbanned.`);
  } catch (e) {
    msg.reply(`There was an error trying to ban: ${e}`);
  }
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
