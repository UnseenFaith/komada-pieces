exports.run = async (client, msg, [user]) => {
  const { muteRole } = msg.guild.settings;
    const value = user.roles.find("name", muteRole);
    if (value) {
      user.removeRole(msg.guild.roles.find("name", muteRole));
    } else {
      user.addRole(msg.guild.roles.find("name", muteRole));
    }
    msg.reply(value ? `${user} is is no longer in the time-out corner. :smiley:` : `${user} is now in the time-out corner. :smiley:`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["unmute"],
  permLevel: 2,
  botPerms: ["MUTE_MEMBERS"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "mute",
  description: "Mutes/unmutes a person on both text and voice.",
  usage: "<user:member>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have a role called Moderators\n3) Bot requires Mute Members permissions.\n4) Requires a role that is called 'Time-Out' set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};

exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.muteRole) {
    await client.settings.guilds.add("muteRole", { type: "String" });
  }
};
