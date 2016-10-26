const fs = require('fs-extra');

/** Runs Blacklist Command
  * @param {Object} client - The Discord.js client
  * @param {Object} msg - The command message
  * @param {(Object|String)} user - The mentioned user or user ID
  */

exports.run = (client, msg, [user]) => {
  fs.readJSON('blacklist.json', (err, blacklist) => {
    if (blacklist != undefined && blacklist.indexOf(user.id) !== -1) {
      msg.reply("Geez... do you hate that person or something.. They're already blacklisted! :smile:")
      return;
    } else {
      if (blacklist === undefined) {
        blacklist = [];
      }
      blacklist.push(user.id);
      fs.writeJson('blacklist.json', blacklist, (err) => {
        if (err) console.log(err);
        else msg.channel.sendMessage(`You have blacklisted the user: ${user.username}#${user.discriminator}.`);
    });
  }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "blacklist",
  description: "Blocks a user from using your bots commands.",
  usage: "<user:user>",
  usageDelim: ""
};
