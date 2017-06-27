const moment = require("moment");
require("moment-duration-format");

const generateMessage = (message) => {
  const starTime = moment(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss");
  const starFooter = `${message.author.tag} in #${message.channel.name} (ID: ${message.id})`;
  return `📌 ${message.cleanContent}\n\n- ${starTime} by ${starFooter}`;
};

exports.run = async (client, msg, [message]) => {
  const channel = msg.guild.channels.find("name", "pins");
  if (!channel) return msg.channel.send("Please create the _pins_ channel and try again.");
  if (channel.postable === false) return msg.channel.send(`I require the permission SEND_MESSAGES to post messages in ${channel} channel.`);
  return channel.send(generateMessage(message));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["note"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["moment", "moment-duration-format"],
};

exports.help = {
  name: "pin",
  description: "Pin messages to a set channel.",
  usage: "<messageid:msg>",
  usageDelim: "",
  type: "commands",
};
