const { inspect } = require("util");

exports.run = (client, msg, [ugc]) => {
  ugc = inspect(ugc, { depth: 0 });
  return msg.channel.send(client.funcs.clean(client, ugc), { code: "js" });
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
