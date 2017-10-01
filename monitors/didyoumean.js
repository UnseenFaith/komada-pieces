/* eslint-disable no-use-before-define */

const levenshtein = require("fast-levenshtein");

exports.run = async (client, msg) => {
  if (msg.author.bot || (client.config.selfbot && msg.author.id !== client.user.id)) return;

  const { prefixLength, command, prefix } = parseCommand(client, msg);
  if (!prefixLength) return;
  if (!command.length && (client.commands.has(command) || client.aliases.has(command))) return;

  const distances = [];
  client.commands.filter(c => c.conf.permLevel <= msg.member.permLevel).forEach((val, cmd) => distances.push({
    dist: levenshtein.get(cmd, command),
    cmd,
  }));
  distances.sort((a, b) => (a.score < b.score ? 1 : -1));
  if (distances[0] && distances[0].dist <= 1) {
    await msg.send(`|\`❔\`| Did you mean \`${prefix + distances[0].cmd}\`?`);
  }
};

exports.conf = {
  enabled: true,
  requiredModules: ["fast-levenshtein"],
};

exports.help = {
  name: "didyoumean",
  type: "monitors",
  description: "Helps users that type in commands incorrectly.",
};

const parseCommand = async (client, msg) => {
  const prefix = client.funcs.getPrefix(client, msg);
  if (!prefix) return false;
  const prefixLength = getLength(client, msg, prefix);
  return {
    command: msg.content.slice(prefixLength).trim().split(" ")[0].toLowerCase(),
    prefix,
    prefixLength,
  };
};

const getLength = (client, msg, prefix) => {
  if (client.config.prefixMention === prefix) return prefix.exec(msg.content)[0].length + 1;
  return prefix.exec(msg.content)[0].length;
};
