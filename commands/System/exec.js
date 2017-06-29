const exec = require("util").promisify(require("child_process").exec);

exports.run = async (client, msg, [input]) => {
  const result = await exec(input).catch((err) => { throw err; });

  const output = result.stdout ? `**\`OUTPUT\`**${"```sh"}\n${result.stdout}\n${"```"}` : "";
  const outerr = result.stderr ? `**\`ERROR\`**${"```sh"}\n${result.stderr}\n${"```"}` : "";
  return msg.channel.send([output, outerr].join("\n"));
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "exec",
  description: "Execute commands in the terminal, use with EXTREME CAUTION.",
  usage: "<expression:str>",
  usageDelim: "",
  extendedHelp: "",
  type: "commands",
};
