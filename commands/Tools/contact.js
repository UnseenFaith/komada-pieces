exports.run = async (client, msg, [type, ...content]) => {
  const types = {
    bug: "Bug Report",
    idea: "New Idea",
    message: "New Message",
  };
  return this.channel.send(`${types[type]} From: ${msg.author} in ${msg.guild ? msg.guild : "private message"}\n\n ${content.toString().join(" ")}`);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["report"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 60,
};

exports.help = {
  name: "contact",
  description: "Need to contact the developers? Reporting a bug? Sending a suggestion?",
  usage: "<bug|idea|message> <content:str> [...]",
  usageDelim: " ",
  extendedHelp: "This is a cool command that will let you use it in different ways. If you do contact bug you can send a bug report. If you do contact idea you can send it to the suggestion pile. If you do message you can send us a private message to the developers. Please note it is extremely helpful to leave a discord invite link so incase we can't understand we can contact you.",
};

exports.channel = null;

exports.init = (client) => {
  this.channel = client.channels.get("CHANNEL_ID");
}
