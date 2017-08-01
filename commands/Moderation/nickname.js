exports.run = async (client, msg, [user, name]) => {
	try {
//checks to see if the nickname is too long or too short for the discord requirement if so replies and then exits.
	  if (name.length > 32 || name.length == 0) {
	    msg.reply('Sorry the nickname was too long or too short.');
	    return
	  }
//set the nickname
	    msg.mentions.members.first().setNickname(`${name}`);
//send a message in regards to what changed in an embed.
	    msg.reply('', {embed: {
	        color: 3447003,
	        author: {
	        name: client.user.username,
	        icon_url: client.user.avatarURL
	        },
	        title: 'Nickname has been changed!',
	        url: 'http://ezlgg.com',
	        description: `Nickname has been changed to ${name} for ${user} :smiley:`,
	        timestamp: new Date(),
	        footer: {
		        icon_url: client.user.avatarURL,
		        text: 'Made with Komada, Discord.js, & <3'
	        }
	    }});
    } catch (e) {
    	msg.reply('Some error occured with un-muting the member. A report has been sent to the developers.');
//please insert the channel id to where you want to recieve the error reports.
    	client.channels.get("CHANNELIDHERE").send(`There was an error trying to un-mute: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
    }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['nick'],
  permLevel: 2,
  botPerms: ['CHANGE_NICKNAME', 'MANAGE_NICKNAMES'],
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