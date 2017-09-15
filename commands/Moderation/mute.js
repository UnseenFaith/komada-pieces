exports.run = async (client, msg, [member]) => {
  if (!msg.guild.settings.muteRole) return msg.reply("Sorry you have not created a mute role for this server.");
  const role = msg.guild.roles.get(muteRole);
  const hasRole = member.roles.has(role.id);
  await member[hasRole ? "removeRole" : "addRole"](role);
  return msg.send(`The user is ${hasRole ? "no longer" : ""} muted. 😄`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["unmute"],
  permLevel: 2,
  botPerms: ["MANAGE_ROLES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "mute",
  description: "Mutes/unmutes a person on both text and voice.",
  usage: "<member:member>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have the modRole as per your configurations\n3) Bot requires Manage Role permissions.\n4) Requires a role with the muteRole settings you made set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};

exports.init = async (client) => {
  if (!client.settings.guilds.schema.muteRole) {
    await client.settings.guilds.add("muteRole", { type: "Role" });
  }
};
