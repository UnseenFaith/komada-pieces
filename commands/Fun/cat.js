const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body: { file } } = await snek.get("http://random.cat/meow");
  return msg.channel.sendFile(file, `cat.${file.split(".")[2]}`);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["meow", "nyan", "kitty", "kitten"],
  permLevel: 0,
  botPerms: ["ATTACH_FILES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "cat",
  description: "Gathers a cat image from random.cat website",
  usage: "",
  usageDelim: "",
};
