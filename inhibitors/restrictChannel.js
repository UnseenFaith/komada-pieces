exports.conf = {
  enabled: true,
  spamProtection: false,
  requiredModules: [],
};

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("commandChannels")) {
    client.funcs.confs.addKey("commandChannels", {});
  }
};

exports.run = (client, msg, cmd) => new Promise((resolve, reject) => {
  if (msg.guildConf.commandChannels[cmd.help.name] && msg.guildConf.commandChannels.hasOwnProperty(cmd.help.name)) {
    const channels = msg.guildConf.commandChannels[cmd.help.name];
    if (channels.indexOf(msg.channel.id) === -1) {
      if (channels.length > 0) {
        const suggestedChannel = msg.guild.channels.get(channels[0]);
        reject(`You cannot use that command in here, please try #${suggestedChannel.name}.`);
      }
      reject("You can not use that command in here");
    }
  }
  resolve();
});

exports.help = {};
exports.help.name = "restrictChannel";
exports.help.description = "Helps restrict command usage to certain channels.";
