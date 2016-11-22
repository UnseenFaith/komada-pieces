exports.run = (client, msg) => {
  msg.channel.sendMessage(`You flipped ${Math.random() > 0.5 ? 'Heads' : 'Tails'}.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: ['coin'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'coinflip',
  description: 'Flips a (pseudo) fair coin.',
  usage: '',
  usageDelim: '',
};
