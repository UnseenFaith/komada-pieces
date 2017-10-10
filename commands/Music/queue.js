exports.run = (client, msg) => {
  const handler = client.queue.get(msg.guild.id);
  if (!handler) throw `Add some songs to the queue first with ${msg.guild.settings.prefix}add`;

  const output = [];
  for (let i = 0; i < Math.min(handler.songs.length, 15); i++) {
    output.push(`${i + 1}. ${handler.songs[i].title} - Requested by: ${handler.songs[i].requester}`);
  }

  return msg.channel.send([
    `🗒 __**${msg.guild.name}'s Music Queue:**__ Currently **${output.length}** songs queued ${(handler.songs.length > 15 ? "*[Only next 15 shown]*" : "")}`,
    `${"```"}${output.join("\n")}${"```"}`,
  ].join("\n"));
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
  name: "queue",
  description: "Displays the music queue.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
