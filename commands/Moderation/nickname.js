exports.run = async (client, msg, [user, name]) => {
  try {
    // checks to see if the nickname is too long or too short for the discord requirement if so replies and then exits.
    if (name.length > 32 || name.length === 0) {
      msg.reply("Sorry the nickname was too long or too short.");
      return;
    }
    // set the nickname
    msg.mentions.members.first().setNickname(`${name}`);
    // send a message in regards to what changed in an embed.
    const embed = new client.methods.Embed()
      .setTitle("Nickname has been changed!")
      .setAuthor(client.user.username, client.user.avatarURL)
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setDescription(`Nickname has been changed to ${name} for ${user} :smiley:`)
      .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      // The URL you wish to have your users linked to when clicking on the title of the embed.
      .setURL("URLHERE");
    msg.reply({ embed });
  } catch (e) {
    msg.reply("Some error occured with un-muting the member. A report has been sent to the developers.");
    // please insert the channel id to where you want to recieve the error reports.
    client.channels.get("CHANNELIDHERE").send(`There was an error trying to un-mute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["nick"],
  permLevel: 2,
  botPerms: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "nickname",
  description: "Change nickname of a user",
  usage: "<user:user> <name:str{1,32}>",
  usageDelim: " ",
  extendedHelp: "1) User will require a role called Moderators\n2) Bot will require a role higher than the user to be able to change nickname.\n3) Up to a maximum of 3 words with spaces and max characters must be 32 or less.",
};
