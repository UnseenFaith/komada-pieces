exports.run = (client, msg, [amount]) => {
  if (amount < 2) amount = 2;
    msg.channel.fetchMessages({
        limit: amount
    }).then(messages => {
        if (client.config.selfbot) {
            messages.map(m => m.delete().catch(error => console.log(error.stack)));
        } else {
            msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
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
    name: "purge",
    description: "This will purge messages sent in a channel",
    usage: "<amount:int{1,100}>",
    usageDelim: ""
};
