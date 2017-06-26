module.exports = (str, l) => {
  const x = str.substring(0, l).lastIndexOf(" ");
  const pos = x === -1 ? l : x;
  return str.substring(0, pos);
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "splitText",
  type: "functions",
  description: "Find the last space of a string and cuts it down to a manageable size for use in Discord.",
};
