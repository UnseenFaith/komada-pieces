exports.run = (client, msg, [nick]) => {
  if (!nick) {
    msg.member.setNickname('');
    msg.edit('Nickname has been cleared');
    msg.delete(10000);
  } else {
    msg.member.setNickname(`${nick}`);
    msg.edit(`Nickname has been changed to ${nick}`);
    msg.delete(10000);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  botPerms: ["CHANGE_NICKNAME"],
  requiredFuncs: []
};

exports.help = {
  name: "nick",
  description: "Set's the bot's nickname",
  usage: "[nick:str]",
  usageDelim: " "
};
