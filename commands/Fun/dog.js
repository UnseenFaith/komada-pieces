const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body: { message } } = await snek.get("https://dog.ceo/api/breeds/image/random");
  return msg.channel.sendFile(message);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["dawg", "duwg", "woof", "bork", "bark", "duggo", "doggo", "dug"],
  permLevel: 0,
  botPerms: ["ATTACH_FILES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "dog",
  description: "Gathers a dog image from random.dog website",
  usage: "",
  usageDelim: "",
};
