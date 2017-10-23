exports.run = (client, msg) => {
  if (msg.guildConf.deleteCommand === true) msg.delete({ interval: 5000 });
  return false;
};

exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.help = {
  name: "deleteCommand",
  type: "inhibitors",
  description: "Enables the ability for Guild/Bot owners to decide if they want all messages that initiate a command to be deleted.",
};

// Uncompatible with Komada SettingGateway
exports.init = (client) => {
  if (!client.funcs.confs.hasKey("deleteCommand")) {
    client.funcs.confs.addKey("deleteCommand", false);
  }
};
