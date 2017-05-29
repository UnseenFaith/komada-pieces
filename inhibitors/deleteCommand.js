exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("deleteCommand")) {
    client.funcs.confs.addKey("deleteCommand", false);
  }
};

exports.run = (client, msg, cmd) => new Promise((resolve) => {
  if (msg.guildConf.deleteCommand === true) {
    msg.delete();
  }
  resolve();
});

exports.help = {};
exports.help.name = "deleteCommand";
exports.help.type = "inhibitors";
exports.help.description = "Enables the ability for Guild/Bot owners to decide if they want all messages that initiate a command to be deleted.";
