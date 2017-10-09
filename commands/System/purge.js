exports.run = async (client, msg, [user = client.user, amount]) => {
  let messages = await msg.channel.messages.fetch({ limit: amount });
  messages = messages.filter(m => m.author.id === user.id);
  if (client.config.selfbot) return messages.forEach(m => m.delete().catch((e) => { throw new Error(e); }));
  return msg.channel.bulkDelete(messages);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  selfbot: false,
  aliases: [],
  permLevel: 0,
  botPerms: ["MANAGE_MESSAGES"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "purge",
  description: "This will remove X amount of messages sent in a channel, or by Y user.",
  usage: "[user:mention] <amount:int{2,100}>",
  usageDelim: " ",
  type: "commands",
};
