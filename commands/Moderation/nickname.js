exports.run = async (client, msg, [member, name = ""]) => {
  if (msg.member.highestRole.comparePositionTo(member.highestRole) >= 0) {
    await member.setNickname(name);
    return msg.send(`Nickname was ${name.length > 0 ? `changed to ${name}`: 'removed'} for ${member} 😄`);
  }
  return msg.send(`Sorry you don\'t have a high enough role to change this ${member} nickname`)
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
  usage: "<member:member> [name:str{1,32}]",
  usageDelim: " ",
  extendedHelp: "1) User will require modRole as per your bot settings\n2) Bot will require a role higher than the user to be able to change nickname.",
};
