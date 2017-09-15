exports.run = async (client, msg, [user]) => {
  const member = msg.guild.members.fetch(user).catch(e => { throw e; });
  const { muteRole } = msg.guild.settings;
  if (!muteRole) return msg.reply("Sorry you have not created a mute role for this server.");
  const value = member.roles.get(muteRole);
const role = msg.guild.roles.get(muteRole);
  if (value && role) {
    await member.removeRole(role);
  } else {
    await member.addRole(role);
  }
  return msg.send(`${user} is ${value ? "not any longer" : "now"} muted. 😄`);
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
    await client.settings.guilds.add("muteRole", { type: "Role" });
  }
};