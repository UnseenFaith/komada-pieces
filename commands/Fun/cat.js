const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body: { file } } = await snek.get("http://random.cat/meow");
  return msg.channel.sendFile(file, `cat.${file.split(".")[2]}`);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  permLevel: 0,
  botPerms: ["SEND_MESSAGES, ATTACH_FILES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "cat",
  description: "Gathers a cat image from random.cat website",
  usage: "",
  usageDelim: "",
};
