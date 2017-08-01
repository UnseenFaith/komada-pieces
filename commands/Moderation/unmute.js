exports.run = async (client, msg, [user]) => {
  try {
//Please write the role name you have set up on your server and you wish to use.
    await msg.mentions.members.first().removeRole(msg.guild.roles.find('name','ROLENAMEHERE'));
    msg.reply('', {embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      description: `${user} is now out of the time-out corner. :smiley:`,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: 'Made with Komada, Discord.js, & <3'
      }
    }});
  } catch (e) {
    msg.reply('Some error occured with unmuting the member. A report has been sent to the developers.');
//please insert the channel id to where you want to recieve the error reports.
    client.channels.get("CHANNELIDHERE").send(`There was an error trying to unmute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['tin', 'unmute'],
  permLevel: 2,
  botPerms: ['MUTE_MEMBERS'],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "unmute",
  description: "Un-mutes a person on both text and voice.",
  usage: "<user:user>",
  usageDelim: "",
  extendedHelp: "1) mute @user\n2) Requires the user to have a role called Moderators\n3) Bot requires Mute Members permissions.\n4) Requires a role that is called 'Time-Out' set up without any permissions and at a high level in the role settings as well as each channel permissions being edited with its settings.",
};