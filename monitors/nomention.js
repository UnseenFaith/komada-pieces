exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.run = (client, msg) => {
  if (!msg.guild) return;
  if (msg.author.id === client.user.id) return;
  const user = `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`;
  const channel = `#${msg.channel.name} (${msg.channel.id}) from ${msg.guild.name}`;
  if (msg.mentions.everyone) client.funcs.log(`${user} mentioned everyone in ${channel}`);
  else if (msg.mentions.users.has(client.user.id)) client.funcs.log(`${user} mentioned you in ${channel}`);
};

exports.help = {};
exports.help.name = "nomention";
exports.help.type = "monitors";
exports.help.description = "Did you get ghost-mentioned? This monitor is for you.";
