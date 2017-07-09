const answers = ["Maybe.", "Certainly not.", "I hope so.", "Not in your wildest dreams.", "There is a good chance.", "Quite likely.", "I think so.", "I hope not.", "I hope so.", "Never!", "Fuhgeddaboudit.", "Ahaha! Really?!?", "Pfft.", "Sorry, bucko.", "Hell, yes.", "Hell to the no.", "The future is bleak.", "The future is uncertain.", "I would rather not say.", "Who cares?", "Possibly.", "Never, ever, ever.", "There is a small chance.", "Yes!"];

exports.run = (client, msg) => msg.reply(msg.content.endsWith("?") ?
  `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
  "🎱 That doesn't look like a question, try again please.");

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["8", "magic", "8ball", "mirror"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "magic8",
  description: "Magic 8-Ball, does exactly what the toy does. (Results may vary)",
  usage: "<query:str>",
  usageDelim: "",
  type: "commands",
};
