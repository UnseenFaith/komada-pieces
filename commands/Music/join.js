exports.run = async (client, msg) => {
  const voiceChannel = msg.member.voiceChannel;
  if (!voiceChannel) {
    throw "You are not conected in a voice channel.";
  }

  const permissions = voiceChannel.permissionsFor(msg.guild.me);
  if (permissions.has("CONNECT") === false) {
    throw "I do not have enough permissions to connect to your voice channel. I am missing the CONNECT permission.";
  }
  if (permissions.has("SPEAK") === false) {
    throw "I can connect... but not speak. Please turn on this permission so I can emit music.";
  }

  await voiceChannel.join();
  return msg.send(`Successfully connected to the voice channel ${voiceChannel}`);
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
  name: "join",
  description: "Joins the message author's voice channel.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
