exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.run = (client, msg) => {
  if (msg.author.id === client.user.id) return;
  if (msg.mentions.everyone) client.funcs.log(`${msg.author.name}#${msg.author.id} mentioned everyone.`);
  else if (msg.mentions.users.has(client.user.id)) client.funcs.log(`${msg.author.name}#${msg.author.id} mentioned you.`);
};

exports.help = {};
exports.help.name = "nomention";
exports.help.description = "Did you get ghost-mentioned? This monitor is for you.";
