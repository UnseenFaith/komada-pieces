const fs = require('fs-extra');

/** Runs Blacklist Command
  * @param {Object} client - The Discord.js client
  * @param {Object} msg - The command message
  * @param {String} user - The mentioned user or user ID
  */

exports.run = (client, msg, [user]) => {
    if (msg.guildConf.blacklist.indexOf(user.id) != -1) {
      msg.reply("You've already blacklisted that user silly! :D")
    } else {
      msg.guildConf.blacklist.push(user.id);
      client.funcs.confs.set(msg.guild, "blacklist", msg.guildConf.blacklist);
      msg.channel.sendMessage(`You have blacklisted ${user.username}#${user.discriminator} from using any commands on this server.`);
    }
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
