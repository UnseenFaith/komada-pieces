exports.conf = {
  enabled: true,
  requiredModules: ["fast-levenshtein"],
};

exports.run = (client, msg) => {
  const levenshtein = require("fast-levenshtein");
  return new Promise((resolve, reject) => {
    const conf = client.configuration.get(msg.guild);
    let prefixLength = conf.prefix.length;
    if (client.config.prefixMention.test(msg.content)) prefixLength = client.config.prefixMention.exec(msg.content)[0].length + 1;
    const command = msg.content.slice(prefixLength).split(" ")[0].toLowerCase();
    if ((msg.content.startsWith(conf.prefix) || client.config.prefixMention.test(msg.content))
    && !(client.commands.has(command) || client.aliases.has(command))) {
      const distances = [];
      client.commands.forEach((val, cmd) => {
        distances.push({
          dist: levenshtein.get(cmd, command),
          cmd2: cmd,
        });
      });
      distances.sort((a, b) => a.dist - b.dist);
      reject(`Did you mean \`${conf.prefix + distances[0].cmd2}\` ?`);
    } else {
      resolve();
    }
  });
};

exports.help = {};
exports.help.name = "didyoumean";
exports.help.description = "Helps users that type in commands incorrectly.";
