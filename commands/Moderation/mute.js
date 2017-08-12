exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.muteRoleName) {
    await client.settings.guilds.add("muteRoleName", "MUTEROLENAME");
  }
  if (!schema.muteRoleId) {
    await client.settings.guilds.add("muteRoleId", "MUTEROLEID");
  }
  if (!schema.titleURL) {
    await client.settings.guilds.add("titleURL", "TITLEURL");
  }
  if (!schema.reportChannelId) {
    await client.settings.guilds.add("reportChannelId", "CHANNELIDHERE");
  }
};

exports.run = async (client, msg, [user]) => {
  try {
    if (msg.mentions.members.first().roles.get(muteRoleId)) {
      msg.mentions.members.first().removeRole(msg.guild.roles.find("name", muteRoleName));
    } else {
      msg.mentions.members.first().addRole(msg.guild.roles.find("name", muteRoleName));
    }
    const embed = new client.methods.Embed()
      .setTitle(value ? "User Is No Longer Muted!" : "User Was Muted!")
      .setAuthor(client.user.username, client.user.avatarURL)
      // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      .setColor(0x00AE86)
      .setDescription(value ? `${user} is is no longer in the time-out corner. :smiley:` : `${user} is now in the time-out corner. :smiley:`)
      .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
      // Takes a Date object, defaults to current date.
      .setTimestamp()
      .setURL(titleURL);
    msg.reply({ embed });
  } catch (e) {
    msg.reply("Some error occured with mute/un-muting the member. A report has been sent to the developers.");
    client.channels.get(reportChannelId).send(`There was an error trying to mute/un-mute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["unmute", ""],
  permLevel: 2,
  botPerms: ["MUTE_MEMBERS"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "mute",
  description: "Mutes/unmutes a person on both text and voice.",
  usage: "<user:user>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have a role called Moderators\n3) Bot requires Mute Members permissions.\n4) Requires a role that is called 'Time-Out' set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};
