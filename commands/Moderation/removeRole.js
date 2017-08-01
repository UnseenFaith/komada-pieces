exports.run = async (client, msg, [user, role]) => {
//tries to remove the role from the user and send back a response.
  try {
    if (msg.guild.roles.exists('name', role)) {
      msg.mentions.members.first().removeRole(msg.guild.roles.find('name', role));
      msg.reply('', {embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: `${user} has lost the ${role} role. :smiley:`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Made with Komada, Discord.js, & <3'
        }
      }
      });
//if the role doesnt exists send this
    } else {
      msg.reply('', {embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: `I am sorry but ${role} role does not exist. :cry:`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Made with Komada, Discord.js, & <3'
        }
      }
      });
    }
  } catch (e) {
    msg.reply('Some error occured with removing a role from the member. A report has been sent to the developers.');    
//please insert the channel id to where you want to recieve the error reports.
    client.channels.get("CHANNELIDHERE").send(`There was an error trying to remove role: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ['rrole', 'rr'],
  permLevel: 2,
  botPerms: ['MANAGE_ROLES'],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "removerole",
  description: "Remove a role from a user.",
  usage: "<user:user> <role:str>",
  usageDelim: " ",
  extendedHelp: "1) User must have a role called Moderators to use this command.\.2) Bot must have Manage Role permissions. The bot will not be able to remove a role higher than its highest role.",
};