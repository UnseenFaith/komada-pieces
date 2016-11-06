const suits = ['♠️', '♦', '♥️', '♠️'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

exports.run = (client, msg, [num]) => {
  const numCards = num === undefined ? 1 : num;

  if (numCards < 1 || numCards > 10) {
    msg.channel.sendMessage('Number of cards should be between 1 and 10.');

    return;
  }

  const lines = [];

  for (let i = 0; i < numCards; ++i) {
    lines.push(`**${ranks[Math.floor(Math.random() * ranks.length)]}**${suits[Math.floor(Math.random() * suits.length)]}`);
  }

  msg.channel.sendMessage(lines.join(', '));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'card',
  description: 'Draws some random cards from a deck.',
  usage: '[num:int]',
  usageDelim: '',
};
