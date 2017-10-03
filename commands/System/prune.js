exports.run = async (client, msg, [amount]) => {
  let messages = await msg.channel.messages.fetch({ limit: amount });
  messages = messages.filter(m => m.author.id === client.user.id);
  if (client.config.selfbot) return messages.forEach(m => m.delete().catch((e) => { throw new Error(e); }));
  return msg.channel.bulkDelete(messages);
};

exports.conf = {
  enabled: true,
  selfbot: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "prune",
  description: "This will remove X amount of messages sent in a channel sent by yourself.",
  usage: "<amount:int{2,100}>",
  usageDelim: " ",
  type: "commands",
};
