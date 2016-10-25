let figlet = require('figlet');
exports.run = (client, msg) => {
    var banner = msg.content.split(' ').slice(1).join(' ');
    figlet(banner, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        msg.channel.sendCode('', data);
    });

};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: false,
    aliases: [],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "banner",
    description: "Creates an ASCII banner from the string you supply",
    usage: "<banner:str>",
    usageDelim: ""
};
