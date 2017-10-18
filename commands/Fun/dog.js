const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body } = await snek.get("https://random.dog/woof.json");
  return msg.channel.send({ files: [{ attachment: body.url, name: `dog.${body.url.split(".")[2]}` }] });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["dawg", "duwg", "woof", "bork", "bark", "duggo", "doggo", "dug"],
  permLevel: 0,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "dog",
  description: "Gathers a dog image from random.dog website",
  usage: "",
  usageDelim: "",
};
