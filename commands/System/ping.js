exports.run = (client, msg) => {
  msg.channel.sendMessage("Ping?")
    .then((message) => {
      message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "ping",
  description: "Ping/Pong command. I wonder what this does? /sarcasm",
  usage: "",
  usageDelim: "",
};
