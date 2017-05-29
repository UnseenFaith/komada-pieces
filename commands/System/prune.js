exports.run = async (client, msg, [amount]) => {
  try {
    let messages = await msg.channel.fetchMessages({ limit: amount });
    messages = messages.filter(m => m.author.id === client.user.id);
    if (client.config.selfbot) messages.map(m => m.delete().catch((e) => { throw new Error(e); }));
    else await msg.channel.bulkDelete(messages);
  } catch (e) {
    client.funcs.log(e, "error");
  }
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
  usage: "<amount:int{1,100}>",
  usageDelim: " ",
  type: "commands",
};
