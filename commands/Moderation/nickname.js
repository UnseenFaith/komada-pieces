exports.run = async (client, msg, [user, name]) => {
  await user.setNickname(name);
  return msg.reply(`Nickname has been changed to ${name} for ${user} 😄`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["nick"],
  permLevel: 2,
  botPerms: ["MANAGE_NICKNAMES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "nickname",
  description: "Change nickname of a user",
  usage: "<user:member> [name:str{1,32}]",
  usageDelim: " ",
  extendedHelp: "1) User will require modRole as per your bot settings\n2) Bot will require a role higher than the user to be able to change nickname.",
};
