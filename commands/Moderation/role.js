exports.run = async (client, msg, [user, role]) => {
  // Check if the discord server has the role by its name
  if (msg.guild.roles.exists("name", role)) {
    // Check if the user already has the role
    if (user.roles.find("name", role)) {
      // Remove role if already posses
      user.removeRole(msg.guild.roles.find("name", role));
      // Send reply
      msg.reply(`${user} has lost the ${role} role. :smiley:`);
    } else {
      // Add role if the role was missing
      user.addRole(msg.guild.roles.find("name", role));
      // Send reply
      msg.reply(`${user} has been given the ${role} role. :smiley:`)
    }
  } else {
    // Send reply if the role doesnt exist on the server
    msg.reply(`I am sorry but ${role} role does not exist. :cry:`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["addrole", "ar", "removerole", "rr"],
  permLevel: 2,
  botPerms: ["MANAGE_ROLES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "role",
  description: "Assign a role to another user.",
  usage: "<user:member> <role:str>",
  usageDelim: " ",
  extendedHelp: "1) User must have a role called Moderators to use this command.\n2) Bot must have Manage Role permissions. The bot will not be able to assign a role higher than its highest role.",
};
