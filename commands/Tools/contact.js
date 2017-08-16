exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.bugChannelId) {
    await client.settings.guilds.add("bugChannelId", {
      "type":"String",
      "default":null,
      "array":false,
      "sql":"TEXT NOT NULL DEFAULT ','"
    });
  }
  if (!schema.ideaChannelId) {
    await client.settings.guilds.add("ideaChannelId", {
      "type":"String",
      "default":null,
      "array":false,
      "sql":"TEXT NOT NULL DEFAULT ','"
    });
  }
  if (!schema.messageChannelId) {
    await client.settings.guilds.add("titleURL", {
      "type":"String",
      "default":null,
      "array":false,
      "sql":"TEXT NOT NULL DEFAULT ','"
    });
  }
  if (!schema.reportChannelId) {
    await client.settings.guilds.add("reportChannelId", {
      "type":"String",
      "default":null,
      "array":false,
      "sql":"TEXT NOT NULL DEFAULT ','"
    });
  }
};

 exports.run = async (client, msg, [type, ...content]) => {
   // Declares all necessary variables to use for the command.
   const { bugChannelId, ideaChannelId, messageChannelId, reportChannelId } = msg.guild.settings;
  try {
    // Determines which type of contact and sends to the appropriate channel.
    if (type === "bug") {
      client.channels.get(bugChannelId).send(`Bug Report From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    } else if (type === "idea") {
      client.channels.get(ideaChannelId).send(`New Idea From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    } else {
      client.channels.get(messageChannelId).send(`New Message From: ${msg.author} in ${msg.guild}\n\n ${content.toString().replace(/,/g, " ")}`);
    }
  } catch (e) {
    msg.reply("Some error occured with relaying a message to the developers. A report has been sent to the developers.");
    client.channels.get(reportChannelId).send(`There was an error trying to relaying a message to the developers: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
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
