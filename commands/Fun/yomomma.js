const request = require("snekfetch");

exports.run = async (client, msg) => {
  const res = await request.get("http://api.yomomma.info").then(data => JSON.parse(data.text));
  return msg.channel.send(`📢 **Yomomma joke:** *${res.joke}*`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["yomama"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["snekfetch"],
};

exports.help = {
  name: "yomomma",
  description: "Yo momma is so fat, yo.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
