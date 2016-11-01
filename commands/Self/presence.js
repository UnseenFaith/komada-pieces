// Big thanks to AoDude, Faith and cyberiumshadow
exports.run = (client, msg, [type, status, ... game]) => {
  game = game.join(" ");
  if (type === "status") {
    if(!status) status = "online";
    client.user.setStatus(status).then(() => {
      msg.channel.sendMessage(`Status changed to ***${status}***`);
    }).catch(error => console.log(error.stack));
  } else if (type === "game") {
    if (!game) game = null;
    client.user.setGame(game).then(() => {
      msg.channel.sendMessage(`${game ? "Game changed to ***" + game + "***" : "Game cleared"}`);
    });
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "presence",
  description: "Set either your 'status' or your 'game' by using this command",
  usage: "<status|game> [online|idle|invisible|dnd] [game:str]",
  usageDelim: " "
};
