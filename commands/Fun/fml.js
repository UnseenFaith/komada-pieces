const request = require("superagent");
const HTMLParser = require("fast-html-parser");

exports.run = (client, msg) => {
  request
  .get("http://www.fmylife.com/random")
  .end((err, res) => {
    if (err) {
      msg.reply(err);
      client.funcs.log(err, "error");
      return;
    }
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector(".block a");
    msg.channel.send(article.text);
  });
};

exports.conf = {
  enabled: true,
  selfbot: false,
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
  type: "command",
};
