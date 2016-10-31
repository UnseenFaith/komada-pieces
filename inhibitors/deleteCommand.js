exports.conf = {
  enabled: true,
  spamProtection: false
};

exports.run = (client, msg, cmd) => {
  return new Promise((resolve, reject) => {
    let conf = msg.guildConf;
    if (!conf.delete) {
      client.funcs.confs.addKey("deleteCommand", false);
      conf = msg.guildConf;
    }
    if (!cmd.conf.ignoreDelete && conf.deleteCommand === true) {
      msg.delete();
      resolve();
    } else {
      resolve();
    }
  });
};
