exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) {
    throw `I am not connected in a voice channel, please add some songs to the queue first with ${msg.guild.settings.prefix}add`;
  }
  if (msg.guild.voiceConnection.dispatcher.paused === false) {
    return msg.send("The stream is not paused.");
  }

  msg.guild.voiceConnection.dispatcher.resume();
  return msg.send("▶ Resumed");
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
  name: "resume",
  description: "Resumes the current song.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
