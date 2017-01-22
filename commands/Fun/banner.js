exports.run = (client, msg) => {
  const figlet = require("figlet");
  const banner = msg.content.split(" ").slice(1).join(" ");
  figlet(banner, (err, data) => {
    if (err) {
      client.funcs.log("Something went wrong...", "error");
      console.dir(err);
      return;
    }
    msg.channel.sendCode("", data);
  });
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["figlet"],
};

exports.help = {
  name: "banner",
  description: "Creates an ASCII banner from the string you supply",
  usage: "<banner:str>",
  usageDelim: "",
};
