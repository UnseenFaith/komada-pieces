const request = require("superagent");
const HTMLParser = require("fast-html-parser");

exports.run = (client, msg) => {
  request
  .get("http://www.fmylife.com/random")
  .end((err, res) => {
    if (err) return msg.reply(err);
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector(".post.article .fmllink");
    return msg.channel.sendMessage(article.childNodes[0].text);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "fml",
  description: "Grabs random 'Fuck My Life' quote from the web.",
  usage: "",
  usageDelim: "",
};
