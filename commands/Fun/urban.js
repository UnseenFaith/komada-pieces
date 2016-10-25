let request = require('request');
exports.run = (client, msg, [search, resultNum]) => {
    var baseUrl = 'http://api.urbandictionary.com/v0/define?term=';
    var theUrl = baseUrl + search;
    request({
        url: theUrl,
        json: true
    }, function(error, response, body) {
        if (!resultNum) {
            resultNum = 0;
        } else if (resultNum > 1) {
            resultNum -= 1;
        }
        let result = body.list[resultNum];
        if (result) {
            var definition = [
                `**Word:** ${search}`,
                '',
                `**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${result.definition}_`,
                '',
                `**Example:**\n${result.example}`,
                `<${result.permalink}>`
            ];
            msg.channel.sendMessage(definition).catch(error => console.log(error.stack));
        } else {
            msg.channel.sendMessage('No entry found.').catch(error => console.log(error.stack));
        }
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
    name: "urban",
    description: "Searches the Urban Dictionary library for a definition to the search term.",
    usage: "<search:str> [resultNum:int]",
    usageDelim: ", "
};
