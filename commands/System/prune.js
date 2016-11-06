exports.run = (client, msg, [amount]) => {
    msg.channel.fetchMessages({
        limit: amount
    }).then(messages => {
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
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "prune",
    description: "soon™",
    usage: "<amount:int{1,100}>",
    usageDelim: " "
};
