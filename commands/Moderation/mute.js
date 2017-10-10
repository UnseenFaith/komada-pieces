exports.run = async (client, msg, [member, role]) => {
  role = typeof role === "string" ? msg.guild.roles.find("name", role) : role;
  if (!role) return msg.send("There is no role by that name in this server.");
  if (member.roles.has(role.id)) {
    await member.removeRole(role);
  } else {
    await member.addRole(role);
  }
  return msg.send(`${member} has ${role ? "lost" : "been given"} the ${role.name} role. 😄`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["addrole", "ar", "removerole", "rr"],
  permLevel: 3,
  botPerms: ["MANAGE_ROLES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "role",
  description: "Assign a role to another user.",
  usage: "<member:member> <role:role|role:str>",
  usageDelim: " ",
  extendedHelp: "1) User must have a modRole as set in the bot settings for your server.\n2) Bot must have Manage Role permissions. The bot will not be able to assign a role higher than its highest role.",
};
