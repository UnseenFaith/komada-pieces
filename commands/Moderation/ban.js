exports.run = async (client, msg, [member]) => {
  try {
    await member.ban();
    msg.channel.send(`${member.username}#${member.discriminator} was banned.`);
  } catch (e) {
    msg.reply(`There was an error trying to ban: ${e}`);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["b"],
  permLevel: 3,
  botPerms: ["BAN_MEMBERS"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "ban",
  description: "Bans a mentioned user. Currently does not require reason (no mod-log)",
  usage: "<member:member>",
  usageDelim: "",
  type: "command",
};
