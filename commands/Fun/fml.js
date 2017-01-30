exports.run = (client, msg) => {
  const request = require("superagent");
  const HTMLParser = require("fast-html-parser");
  request
  .get("http://www.fmylife.com/random")
  .end((err, res) => {
    if (err) return msg.reply(err);
    client.funcs.log(err.stack, "error");
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector(".post.article .fmllink");
    return msg.channel.sendMessage(article.childNodes[0].text);
  });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["superagent", "fast-html-parser"],
};

exports.help = {
  name: "fml",
  description: "Grabs random 'Fuck My Life' quote from the web.",
  usage: "",
  usageDelim: "",
};
