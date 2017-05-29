exports.run = (client, msg) => {
  const keycheck = client.funcs.confs.hasKey("minAccAge");
  if (!keycheck) { client.funcs.confs.addKey("minAccAge", 1800000); }
  const accAge = msg.guildConf.minAccAge;
  const mtime = msg.createdTimestamp;
  const check = msg.guild.members.filter(m => (mtime - m.user.createdTimestamp) <= accAge);
  if (check.size) {
    const result = check.map(u => `${u.user.username}#${u.user.discriminator}, Created:${((mtime - u.user.createdTimestamp) / 1000 / 60).toFixed(0)} min(s) ago`).join("\n");
    msg.reply(`The following users are less than the Minimum Account Age: \n \`\`\`xl\n${result}\n\`\`\` `);
  } else {
    msg.reply("No users less than Minimum Account Age were found in the guild.");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "check",
  description: "Checks the guild for any user accounts younger than the minimum account age.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
