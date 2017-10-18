const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body } = await snek.get("http://random.cat/meow");
  await msg.send({ files: [{ attachment: body.file, name: `cat.${body.file.split(".")[2]}` }] }).catch(e => msg.channel.send(e));
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  permLevel: 0,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "cat",
  description: "Gathers a cat image from random.cat website",
  usage: "",
  usageDelim: "",
};
