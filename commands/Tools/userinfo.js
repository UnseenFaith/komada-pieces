// Created by Jellz#9453, hehehehehe.
exports.run = (client, msg, [member]) => {
	if (member.id == client.user.id) {
    msg.channel.send(`\`\`\`asciidoc\n= BOT INFORMATION =\n\n• ID :: ${client.user.id}\n• Username :: ${client.user.username}#${client.user.discriminator}\n• Guilds :: ${client.guilds.size}\n• Users :: ${client.users.size}\n• Channels :: ${client.channels.size}\`\`\``);
  } else {
    var user = member.user
    msg.channel.send(`\`\`\`asciidoc\n= USER INFORMATION (${member.user.tag}) =\n\n• ID :: ${user.id}\n• Created at :: ${user.createdAt}\n• Bot? :: ${user.bot}\n• Highest Role :: ${member.highestRole.name}\n• Joined guild :: ${member.joinedAt}\n• Server Deafened? :: ${member.serverDeaf}\n• Server Muted? :: ${member.serverMute}\n• Display name :: ${member.displayName}\`\`\``)
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "userinfo",
  description: "Replies with information on the specified user!",
  usage: "<member:member>",
  usageDelim: "",
};
