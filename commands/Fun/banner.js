exports.run = (client, msg, [banner]) => {
  const figlet = require("figlet"); // eslint-disable-line global-require
  figlet(banner, (err, data) => {
    if (err) return client.funcs.log(`Something went wrong... ${err}`, "error");
    return msg.channel.sendCode("", data).catch(e => client.funcs.log(e, "error"));
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
  requiredModules: ["figlet"],
};

exports.help = {
  name: "banner",
  description: "Creates an ASCII banner from the string you supply",
  usage: "<banner:str>",
  usageDelim: "",
  type: "commands",
};
