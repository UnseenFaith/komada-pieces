exports.run = async (client, msg) => {
  const rp = require("request-promise-native"); // eslint-disable-line global-require
  try {
    const res = await rp.get("http://api.yomomma.info").then(JSON.parse);
    msg.channel.send(`📢 **Yomomma joke:** *${res.joke}*`);
  } catch (e) {
    client.funcs.log(e, "error");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["yomama"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["request-promise-native"],
};

exports.help = {
  name: "yomomma",
  description: "Yo momma is so fat, yo.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
