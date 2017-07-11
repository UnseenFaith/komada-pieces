exports.run = (client, msg) => msg.reply(`You flipped ${Math.random() > 0.5 ? "Heads" : "Tails"}.`);

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["coin"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "coinflip",
  description: "Flips a (pseudo) fair coin.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
