exports.run = async (client, msg, [...choices]) => {
  const validChoices = choices.filter(x => x);
  return msg.reply(validChoices.length === 1 ?
    "You only gave me one choice, dummy." :
    `I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
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
