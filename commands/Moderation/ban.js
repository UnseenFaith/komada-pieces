exports.run = async (client, msg, [member]) => {
  try {
    await msg.guild.ban(member);
    msg.channel.send(`${member.user.username}#${member.user.discriminator} was banned.`);
  } catch (e) {
    msg.reply(`There was an error trying to ban: ${e}`);
  }
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
