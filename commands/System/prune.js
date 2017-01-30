exports.run = (client, msg, [amount]) => {
  msg.channel.fetchMessages({
    limit: amount,
  }).then((messages) => {
    if (client.config.selfbot) amount++;
    messages = messages.filter(m => m.author.id === client.user.id).array().slice(0, amount);
    if (client.config.selfbot) {
      messages.map(m => m.delete().catch(error => console.log(error.stack)));
    } else {
      msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    }
  });
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
};
