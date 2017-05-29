exports.run = async (client, msg, [member]) => {
  try {
    await member.kick();
    msg.channel.send(`${member.user.username}#${member.user.discriminator} was kicked.`);
  } catch (e) {
    msg.reply(`There was an error trying to kick: ${e}`);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "kick",
  description: "Kicks a mentioned user. Currently does not require reason (no mod-log)",
  usage: "<member:member>",
  usageDelim: "",
  type: "commands",
};
