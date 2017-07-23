exports.run = async (client, msg) => {
  const user = msg.mentions.users.first();
  const amount = parseInt(msg.content.split(" ").pop());

  if (!amount) return msg.reply("Must specify an amount to delete!");
  if (!amount && !user) return msg.reply("Must specify a user and amount, or just an amount, of messages to purge!");

  if (user) {
    msg.channel.fetchMessages({ limit: 100 }).then((messages) => {
      const userMsgs = messages.filter(m => m.author.id === user.id).array().slice(0, amount);
      return msg.channel.bulkDelete(userMsgs).catch(error => console.log(error.stack));
    });
  } else return msg.channel.bulkDelete(amount);
  return console.log("Deleted!");
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  selfbot: false,
  aliases: [],
  permLevel: 3,
  botPerms: ["MANAGE_MESSAGES"],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "purge",
  description: "This will remove X amount of messages sent in a channel, or all msg by Y user in X range.",
  extendedHelp: "Remove all messages in channel by last X amount, or remove all messages only from Mentioned user from last X messages range.",
  usage: "[user:mention] <amount:int{2,25}>",
  usageDelim: " ",
  type: "commands",
};
