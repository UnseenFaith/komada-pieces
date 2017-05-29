module.exports = (str, l) => {
  const x = str.substring(0, l).lastIndexOf(" ");
  const pos = x === -1 ? l : x;
  return str.substring(0, pos);
};

exports.help = {};
exports.help.name = "splitText";
exports.help.type = "functions";
exports.help.description = "Find the last space of a string and cuts it down to a manageable size for use in Discord.";
exports.conf = {};
exports.conf.requiredModules = [];
