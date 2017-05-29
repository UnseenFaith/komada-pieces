exports.run = async (client, msg, [nick = ""]) => {
  try {
    await msg.member.setNickname(nick);
    const text = nick.length ? `Nickname changed to ${nick}` : "Nickname Cleared";
    const response = await msg.channel.send(text);
    response.delete(5000);
  } catch (e) {
    client.funcs.log(e, "error");
  }
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
