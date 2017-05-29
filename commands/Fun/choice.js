exports.run = (client, msg, [...choices]) => {
  const validChoices = choices.filter(x => x);

  if (validChoices.length === 1) {
    msg.reply("You only gave me one choice, dummy.");
  } else {
    msg.reply(`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["choose", "decide"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "choice",
  description: "Makes a decision for you given some choices.",
  usage: "<choices:str> [...]",
  usageDelim: "|",
  type: "commands",
};
