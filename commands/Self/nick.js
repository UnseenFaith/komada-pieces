exports.run = (client, msg, [nick]) => {
    var newNick = !nick ? "" : nick.split(',').join(' ');
    msg.guild.member(client.user).setNickname(newNick).then(() => {
        let text = newNick ? 'Nickname changed to ' + newNick : 'Nickname Cleared';
        msg.channel.sendMessage(text).then(response => response.delete(10000)).catch(error => console.log(error.stack));
    }).catch(error => console.log(error.stack));
};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: true,
    aliases: [],
    permLevel: 3,
    botPerms: ["CHANGE_NICKNAME"],
    requiredFuncs: []
};

exports.help = {
    name: "nick",
    description: "Set's the bot's nickname",
    usage: "[nick:str]",
    usageDelim: ", "
};
