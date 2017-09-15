const types = {
  bug: "Bug Report",
  idea: "New Idea",
  message: "New Message",
};
exports.run = async (client, msg, [type, ...content]) => {
  this.channel.send(`${types[type]} From: ${msg.author} in ${msg.guild ? msg.guild : "private message"}\n\n ${content.toString().join(" ")}`);
  return msg.send("Your message has been sent to the developer. We appreciate you being a user. Thank you!");
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
  // You will need to add a supportChannel setting in the Komada Configurations in app.js/index.js file
  this.channel = client.channels.get(client.config.supportChannel);
};
