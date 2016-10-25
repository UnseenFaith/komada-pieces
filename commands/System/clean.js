exports.run = (client, msg, [type, user, amount]) => {
  console.log(type, user, amount);
    msg.channel.fetchMessages({
        limit: 100
    }).then(messages => {
      if (type == "purge") {
        if (client.config.selfbot) {
            messages.map(m => m.delete().catch(error => console.log(error.stack)));
        } else {
            msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        }
      } else

      if (type == "prune") {
        var msg_array = messages.array();
        if (client.config.selfbot) {
            if (user) {
                msg_array = msg_array.filter(m => m.author.id === user.id).slice(0, amount + 1);
            } else {
                msg_array = msg_array.filter(m => m.author.id === client.user.id).slice(0, amount + 1);
            }
            msg_array.map(m => m.delete().catch(error => console.log(error.stack)));
        } else {
          if (user) {
            msg_array = msg_array.filter(m => m.author.id === user.id).slice(0, amount);
          } else {
            msg_array = msg_array.filter(m => m.author.id === client.user.id).slice(0, amount);
          }
            msg.channel.bulkDelete(msg_array).catch(error => console.log(error.stack));
        }
      }
    });
};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: []
};

exports.help = {
    name: "clean",
    description: "soon™",
    usage: "<purge|prune> [user:mention] <amount:int{1,100}>",
    usageDelim: " "
};
