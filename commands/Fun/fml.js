const request = require("snekfetch");
const HTMLParser = require("fast-html-parser");

exports.run = async (client, msg) => {
  const { text: html } = await request.get("http://www.fmylife.com/random");
  const root = HTMLParser.parse(html);
  const article = root.querySelector(".block a");
  return msg.channel.send(article.text);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["snekfetch", "fast-html-parser"],
};

exports.help = {
  name: "fml",
  description: "Grabs random 'Fuck My Life' quote from the web.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
