exports.run = async (client, msg) => {
  const rp = require("request-promise-native"); // eslint-disable-line global-require
  const HTMLParser = require("fast-html-parser"); // eslint-disable-line global-require
  try {
    const body = await rp.get("http://www.fmylife.com/random");
    const root = HTMLParser.parse(body);
    const article = root.querySelector(".block a");
    msg.channel.send(article.text);
  } catch (e) {
    msg.reply(e);
    client.funcs.log(e, "error");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["request-promise-native", "fast-html-parser"],
};

exports.help = {
  name: "fml",
  description: "Grabs random 'Fuck My Life' quote from the web.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
