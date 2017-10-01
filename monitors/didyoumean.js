/* eslint-disable no-use-before-define, no-restricted-syntax */

const levenshtein = require("fast-levenshtein");

exports.minDist = null;

exports.init = (client) => {
  this.minDist = client.config.minDist && Number.isInteger(client.config.minDist) && client.config.minDist >= 1 ? client.config.minDist : 1;
};

exports.run = async (client, msg) => {
  if (msg.author.bot || (client.config.selfbot && msg.author.id !== client.user.id)) return;

  const { prefixLength, command, prefix } = parseCommand(client, msg);

  if (!prefixLength) return;
  if (!command.length && (client.commands.has(command) || client.aliases.has(command))) return;

  const distances = [];

  for (const cmd in client.commands) {
    if (!client.funcs.checkPerms(client, msg, cmd.conf.permLevel)) continue;
    distances.push({
      dist: levenshtein.get(cmd, command),
      cmd,
    });
  }

  if (distances.length === 0) return;
  distances.sort((a, b) => (a.score < b.score ? 1 : -1));
  if (distances[0] && distances[0].dist <= this.minDist) {
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
