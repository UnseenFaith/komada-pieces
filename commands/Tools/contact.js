/* Add in the channel ID where you want to recieve reports in your app.js file Komada Configurations.
  new Komada({
    prefix: blah,
    ..more here,
    supportChannel: 'someID',
    }).login(token);
*/
exports.run = async (client, msg, [type, ...content]) => {
  const types = {
    bug: "Bug Report",
    idea: "New Idea",
    message: "New Message",
  }
  return client.config.supportChannel.send(`${types[type]} From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
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
