exports.run = async (client, msg, [user]) => {
  const { muteRole } = msg.guild.settings;
  const value = user.roles.get(muteRole);
  if (value) {
    await user.removeRole(msg.guild.roles.get(muteRole));
  } else {
    await user.addRole(msg.guild.roles.get(muteRole));
  }
  return msg.reply(value ? `${user} is is no longer muted. 😄` : `${user} is now muted. 😄`);
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
  usage: "<user:member>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have the modRole as per your configurations\n3) Bot requires Manage Role permissions.\n4) Requires a role with the muteRole settings you made set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};

exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.muteRole) {
    await client.settings.guilds.add("muteRole", { type: "String" });
  }
};
