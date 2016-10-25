exports.run = (client, msg, [amount]) => {
    msg.channel.fetchMessages({
      limit: 100
    })
      .then(messages => {
        var msg_array = messages.array();
        if (client.config.selfbot) {
          msg_array = msg_array.filter(m => m.author.id === client.user.id).slice(0, amount + 1);
          msg_array.map(m => m.delete().catch(error => console.log(error.stack)));
        }else{
          msg_array = msg_array.filter(m => m.author.id === client.user.id).slice(0, amount);
          msg.channel.bulkDelete(msg_array).catch(error => console.log(error.stack));
        }
      });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "prune",
  description: "This will prune messages sent by this bot",
  usage: "<amount:int{1,100}>",
  usageDelim: ""
};
