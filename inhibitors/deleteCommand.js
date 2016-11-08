exports.conf = {
  enabled: true,
  spamProtection: false
};
exports.init = (client) => {
  if (!client.funcs.confs.hasKey("deleteCommand")) {
    client.funcs.confs.addKey("deleteCommand", false);
  }
}

exports.run = (client, msg, cmd) => {
  return new Promise((resolve, reject) => {
    if (!cmd.conf.ignoreDelete && msg.guildConf.deleteCommand === true) {
      msg.delete();
    }
      resolve();
    }
  });
};
