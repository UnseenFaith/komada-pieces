const snek = require("snekfetch");

exports.run = async (client, msg) => {
  const { body: data } = await snek.get("https://dog.ceo/api/breeds/image/random");
  await msg.channel.send({ files: [{ attachment: data.message, name: "Doggy.png" }] }).catch(e => msg.channel.send(e));
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["dawg", "duwg", "woof", "bork", "stitch", "bark", "duggo", "doggo", "dug"],
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
