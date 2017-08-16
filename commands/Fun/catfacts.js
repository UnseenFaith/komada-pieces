const snekfetch = require("snekfetch");

exports.run = async (client, msg) => {
  return snekfetch.get("https://catfact.ninja/fact").then(res => msg.channel.send(`📢 **Catfact:** *${res.body.fact}*`));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["catfact", "kittenfact"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["snekfetch"],
};

exports.help = {
  name: "catfacts",
  description: "Let me tell you a misterious cat fact.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
