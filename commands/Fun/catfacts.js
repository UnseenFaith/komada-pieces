exports.run = async (client, msg) => {
  const rp = require("request-promise-native"); // eslint-disable-line global-require
  try {
    const res = await rp.get("http://catfacts-api.appspot.com/api/facts").then(JSON.parse);
    msg.channel.send(`📢 **Catfact:** *${res.facts[0]}*`);
  } catch (e) {
    client.funcs.log(e, "error");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["catfact", "kittenfact"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["request-promise-native"],
};

exports.help = {
  name: "catfacts",
  description: "Let me tell you a misterious cat fact.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
