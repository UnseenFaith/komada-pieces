exports.run = async (client, msg, [user = client.user, amount]) => {
  try {
    let messages = await msg.channel.fetchMessages({ limit: amount });
    messages = messages.filter(m => m.author.id === user.id);
    if (client.config.selfbot) messages.map(m => m.delete().catch((e) => { throw new Error(e); }));
    else await msg.channel.bulkDelete(messages);
  } catch (e) {
    client.funcs.log(e, "error");
  }
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
  usage: "[user:mention] <amount:int{1,100}>",
  usageDelim: " ",
  type: "commands",
};
