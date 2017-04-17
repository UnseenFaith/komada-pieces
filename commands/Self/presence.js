// Big thanks to AoDude, Faith and cyberiumshadow
// And kyra#2490 for rewritting this.
exports.run = async (client, msg, [type, status = "online", ...game]) => {
  game = game.length ? game.join(" ") : null;
  try {
    if (type === "status") {
      await client.user.setStatus(status);
      msg.channel.send(`Status changed to ***${status}***`);
    } else if (type === "game") {
      await client.user.setGame(game);
      msg.channel.send(`${game ? `Game changed to ***${game}***` : "Game cleared"}`);
    }
  } catch (e) {
    client.funcs.log(e, "error");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "presence",
  description: "Set either your 'status' or your 'game' by using this command",
  usage: "<status|game> [online|idle|invisible|dnd] [game:str]",
  usageDelim: " ",
  type: "commands",
};
