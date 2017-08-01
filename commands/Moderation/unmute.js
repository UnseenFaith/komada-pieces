exports.run = async (client, msg, [user]) => {
  try {
    // Please write the role name you have set up on your server and you wish to use.
    await msg.mentions.members.first().removeRole(msg.guild.roles.find("name", "ROLENAMEHERE"));
    const embed = new client.methods.Embed()
      .setTitle("Unmuted The User!")
      .setAuthor(client.user.username, client.user.avatarURL)
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setDescription(`${user} is now out of the time-out corner. :smiley:`)
      .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      // The URL you wish to have your users linked to when clicking on the title of the embed.
      .setURL("URLHERE");
    msg.reply({ embed });
  } catch (e) {
    msg.reply("Some error occured with unmuting the member. A report has been sent to the developers.");
    // please insert the channel id to where you want to recieve the error reports.
    client.channels.get("CHANNELIDHERE").send(`There was an error trying to unmute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["tin", "unmute"],
  permLevel: 2,
  botPerms: ["MUTE_MEMBERS"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "unmute",
  description: "Un-mutes a person on both text and voice.",
  usage: "<user:user>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have a role called Moderators\n3) Bot requires Mute Members permissions.\n4) Requires a role that is called "Time-Out" set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};
