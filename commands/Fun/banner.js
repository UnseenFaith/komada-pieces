const figletAsync = require("util").promisify(require("figlet"));

exports.run = async (client, msg, [banner]) => {
  const data = await figletAsync(banner);
  return msg.channel.send(data, { code: true });
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["figlet"],
};

exports.help = {
  name: "banner",
  description: "Creates an ASCII banner from the string you supply",
  usage: "<banner:str>",
  usageDelim: "",
  type: "commands",
};
