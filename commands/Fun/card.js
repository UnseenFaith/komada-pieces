const suits = ["♠️", "♦", "♥️", "♠️"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

exports.run = (client, msg, [num]) => {
  const numCards = num;
  const lines = [];

  for (let i = 0; i < numCards; ++i) {
    lines.push(`**${ranks[Math.floor(Math.random() * ranks.length)]}**${suits[Math.floor(Math.random() * suits.length)]}`);
  }

  msg.channel.send(lines.join(", "));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "card",
  description: "Draws some random cards from a deck.",
  usage: "<num:int{1,10}>",
  usageDelim: "",
  type: "commands",
};
