const fs = require('fs-extra');

exports.conf = {
    enabled: true,
    spamProtection: false
};

/** Run Blacklists Inhibitor
  * @param {Object} client - The Discord.js client
  * @param {Object} msg - The command message
  * @param {Object} cmd - The command
  * @returns Reject() or Resolve(), depending on if the user is blacklisted or not.
  */

  exports.run = (client, msg, cmd) => {
    return new Promise((resolve, reject) => {
        let guildConf = client.funcs.confs.get(msg.guild);
        if (!guildConf.blacklist) {
            client.funcs.confs.addKey(client, 'blacklist', []);
          }
          if (guildConf.blacklist.indexOf(msg.author.id) != -1) {
              reject("You are blacklisted from using commands.");
            } else {
              resolve();
            }
    });
  };
