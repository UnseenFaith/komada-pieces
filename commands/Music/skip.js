exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) {
    throw `I am not connected in a voice channel, please add some songs to the queue first with ${msg.guild.settings.prefix}add`;
  }

  msg.guild.voiceConnection.dispatcher.end();
  return msg.send("⏭ Skipped");
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "skip",
  description: "Skips the current song.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
