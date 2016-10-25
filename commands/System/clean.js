exports.run = (client, msg, [type, user, amount]) => {
  let purgecount = type == "prune" ? 100 : amount;
  msg.channel.fetchMessages({
      limit: purgecount
  }).then(messages => {
    if (type == "prune") {
      let filterBy = user ? user.id : client.user.id;
      if(client.config.selfBot) amount++;
      messages = message.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }

    if (client.config.selfbot) {
        messages.delete().catch(error => console.log(error.stack);
    } else {
        msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
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
