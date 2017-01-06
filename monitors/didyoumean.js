const levenshtein = require("fast-levenshtein");

exports.conf = {
  enabled: true,
};

exports.run = (client, msg) => {
  return new Promise((resolve, reject) => {
    const conf = client.funcs.confs.get(msg.guild);
    let prefixLength = conf.prefix.length;
    if (client.config.prefixMention.test(msg.content)) prefixLength = client.config.prefixMention.exec(msg.content)[0].length + 1;
    const command = msg.content.slice(prefixLength).split(" ")[0].toLowerCase();
    if ((msg.content.startsWith(conf.prefix) || client.config.prefixMention.test(msg.content))
    && !client.commands.has(command)) {
      let distances = [];
      client.commands.forEach((val, cmd) => {
        distances.push({
          "dist" : levenshtein.get(cmd, command),
          "cmd" : cmd
        });
      });
      distances.sort((a,b) => {
        return a.dist - b.dist;
      });
      reject(`Did you mean \`${conf.prefix + distances[0].cmd}\` ?`);
    } else {
      resolve();
    }
  });
};
