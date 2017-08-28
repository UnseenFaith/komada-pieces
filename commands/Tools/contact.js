exports.run = async (client, msg, [type, ...content]) => {
  try {
    // Determines which type of contact and sends to the appropriate channel.
    if (type === "bug") {
      this.channel.send(`Bug Report From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    } else if (type === "idea") {
      this.channel.send(`New Idea From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    } else {
      this.channel.send(`New Message From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    }
  } catch (e) {
    msg.reply("Some error occured with relaying a message to the developers. A report has been sent to the developers.");
    this.channel.send(`There was an error trying to relaying a message to the developers: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
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
