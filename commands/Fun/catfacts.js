const request = require("snekfetch");

exports.run = async (client, msg) => {
  const { facts } = await request.get("http://catfacts-api.appspot.com/api/facts").then(data => JSON.parse(data.text));
  return msg.channel.send(`📢 **Catfact:** *${facts[0]}*`);
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
