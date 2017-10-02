/* eslint-disable no-use-before-define, no-restricted-syntax, consistent-return, guard-for-in */

let levenshtein;

exports.minDist = null;

exports.init = (client) => {
  levenshtein = require("fast-levenshtein");
  this.minDist = client.config.minDist && Number.isInteger(client.config.minDist) && client.config.minDist >= 1 ? client.config.minDist : 1;
};

exports.run = async (client, msg) => {
  if (msg.author.bot || (!client.user.bot && msg.author.id !== client.user.id)) return;

  const { prefixLength, command } = await parseCommand(client, msg);
  if (!prefixLength) return;
  if (!command.length && (client.commands.has(command) || client.aliases.has(command))) return;

  const distances = [];

  for (const cmd of msg.usableCommands) {
    distances.push({
      dist: levenshtein.get(cmd[0], command),
      cmd,
    });
  }

  if (distances.length === 0) return;
  distances.sort((a, b) => a.dist - b.dist);

  if (distances[0].dist > 0 && distances[0].dist <= this.minDist) {
    return msg.send(`|\`❔\`| Did you mean \`${msg.guildSettings.prefix + distances[0].cmd[0]}\`?`).catch((err) => {
      client.console.log(err, "error");
    });
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
    prefixLength,
  };
};

const getLength = (client, msg, prefix) => {
  if (client.config.prefixMention === prefix) return prefix.exec(msg.content)[0].length + 1;
  return prefix.exec(msg.content)[0].length;
};
