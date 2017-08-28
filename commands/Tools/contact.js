exports.run = async (client, msg, [type, ...content]) => {
  // Determines which type of contact and sends to the appropriate channel.
  let output = "";
  if (type === "bug") {
    output += "Bug Report";
  } else if (type === "idea") {
    output += "New Idea";
  } else {
    output += "New Message";
  }
  this.channel.send(`${output} From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["report"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
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
  // Insert channel ID of the channel you would like for the users to contact you on.
  this.channel = client.channels.get("CHANNEL_ID");
};
