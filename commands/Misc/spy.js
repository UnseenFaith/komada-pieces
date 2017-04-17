exports.run = (client, msg, [ugc]) => {
  const util = require("util").inspect; // eslint-disable-line global-require
  ugc = util(ugc, { depth: 0 });
  msg.channel.sendCode("xl", client.funcs.clean(client, ugc));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "spy",
  description: "Spies on a user, guild, or channel",
  usage: "<role:role|msg:msg|user:user|guild:guild|channel:channel>",
  usageDelim: "",
  type: "commands",
};
