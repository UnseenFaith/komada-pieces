exports.run = async (client, msg, [nick = ""]) => {
  await msg.member.setNickname(nick);
  const text = nick.length > 0 ? `Nickname changed to ${nick}` : "Nickname Cleared";
  return msg.channel.send(text).then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: [],
  permLevel: 10,
  botPerms: ["CHANGE_NICKNAME"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "nick",
  description: "Set's the bot's nickname",
  usage: "[nick:str]",
  usageDelim: "",
  type: "commands",
};
