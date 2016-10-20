var answers = [
  "Maybe.",
  "Certainly not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope not.",
  "I hope so.",
  "Never!",
  "Fuhgeddaboudit.",
  "Ahaha! Really?!?",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say.",
  "Who cares?",
  "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!"
];

exports.run = (client, msg) => {
  if (msg.content.endsWith("?")) {
    msg.reply(":8ball: " + answers[Math.floor(Math.random() * answers.length)]).catch(error => console.log(error.stack));
  } else {
    msg.reply(":8ball: That doesn't look like a question, try again please.").catch(error => console.log(error.stack));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["8","magic","8ball"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "magic8",
  description: "Magic 8-Ball",
  usage: "<query:str>",
  usageDelim: ""
};
