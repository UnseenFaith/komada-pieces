exports.run = (client, msg, [nick]) => {
  const newNick = !nick ? "" : nick.split(",").join(" ");
  msg.guild.member(client.user).setNickname(newNick).then(() => {
    const text = newNick ? `Nickname changed to ${newNick}` : "Nickname Cleared";
    msg.channel.sendMessage(text).then(response => response.delete(10000)).catch(error => console.log(error.stack));
  }).catch(error => console.log(error.stack));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: [],
  permLevel: 3,
  botPerms: ["CHANGE_NICKNAME"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "nick",
  description: "Set's the bot's nickname",
  usage: "[nick:str]",
  usageDelim: ", ",
};
