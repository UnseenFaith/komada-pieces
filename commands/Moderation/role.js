exports.run = async (client, msg, [user, role]) => {
  try {
    // The URL you wish to have your users linked to when clicking on the title of the embed.
    const titleURL = "URLHERE";
      // The channel id to where the bot sends a error report when something goes wrong.
    const reportChannelId = "CHANNELIDHERE";

    if (msg.guild.roles.exists("name", role)) {
      if (msg.mentions.members.first().roles.find("name", role)) {
        msg.mentions.members.first().removeRole(msg.guild.roles.find("name", role));
        const embed = new client.methods.Embed()
          .setTitle("Role Removed From User!")
          .setAuthor(client.user.username, client.user.avatarURL)
          /*
          * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
          */
          .setColor(0x00AE86)
          .setDescription(`${user} has lost the ${role} role. :smiley:`)
          .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
          /*
          * Takes a Date object, defaults to current date.
          */
          .setTimestamp()
          .setURL("URLHERE");
        msg.reply({ embed });
      } else if (!msg.mentions.members.first().roles.find("name", role)) {
        msg.mentions.members.first().addRole(msg.guild.roles.find("name", role));
        const embed = new client.methods.Embed()
          .setTitle("Role Added To User!")
          .setAuthor(client.user.username, client.user.avatarURL)
          /*
          * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
          */
          .setColor(0x00AE86)
          .setDescription(`${user} has been given the ${role} role. :smiley:`)
          .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
          /*
          * Takes a Date object, defaults to current date.
          */
          .setTimestamp()
          .setURL("URLHERE");
        msg.reply({ embed });
      }
    } else {
      const embed = new client.methods.Embed()
        .setTitle("Role Not Found On Server!")
        .setAuthor(client.user.username, client.user.avatarURL)
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setDescription(`I am sorry but ${role} role does not exist. :cry:`)
        .setFooter("Made with Komada, Discord.js, & <3", client.user.avatarURL)
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL("URLHERE");
      msg.reply({ embed });
    }
  } catch (e) {
    msg.reply("Some error occured with adding a role to the member. A report has been sent to the developers.");
    // Please insert the channel id to where you want to recieve the error reports.
    client.channels.get(reportChannelId).send(`There was an error trying to add a role: ${e} in ${msg.channel} on ${msg.guild} by ${msg.author}`);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["addrole", "ar", "removerole", "rr"],
  permLevel: 2,
  botPerms: ["MANAGE_ROLES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "role",
  description: "Assign a role to another user.",
  usage: "<user:user> <role:str>",
  usageDelim: " ",
  extendedHelp: "1) User must have a role called Moderators to use this command.\n2) Bot must have Manage Role permissions. The bot will not be able to assign a role higher than its highest role.",
};
