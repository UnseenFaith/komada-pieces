const { exec } = require("child_process");

exports.run = (client, msg, [input]) => exec(input, (error, stdout, stderr) => {
  if (error) {
    return msg.channel.send(`**\`ERROR\`**${"```sh"}\n${error}\n${"```"}`);
  }
  stdout = stdout ? `**\`OUTPUT\`**${"```sh"}\n${stdout}\n${"```"}` : "";
  stderr = stderr ? `**\`ERROR\`**${"```sh"}\n${stderr}\n${"```"}` : "";
  return msg.channel.send([stdout, stderr].join("\n"));
});

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
