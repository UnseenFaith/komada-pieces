exports.run = (client, msg) => {
  if (!msg.guild || msg.author.id === client.user.id) return;
  const user = `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`;
  const channel = `#${msg.channel.name} (${msg.channel.id}) from ${msg.guild.name}`;
  if (msg.mentions.everyone) client.emit("log", `${user} mentioned everyone in ${channel}`);
  else if (msg.mentions.users.has(client.user.id)) client.emit("log", `${user} mentioned you in ${channel}`);
};

exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.help = {
  name: "nomention",
  type: "monitors",
  description: "Did you get ghost-mentioned? This monitor is for you.",
};
