let request = require('request');
exports.run = (client, msg, [search, resultnum]) => {
  var baseUrl = 'http://api.urbandictionary.com/v0/define?term=';
  var theUrl = baseUrl + search;
  request({
    url: theUrl,
    json: true
  }, function(error, response, body) {
    if (!resultnum) resultnum = 0;
    let result = body.list[resultnum];
    if (result) {
      var definition = [
        `**Word:** ${search}`,
        '',
        `**Definition:**\n_${result.definition}_`,
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
    guildOnly: false,
    aliases: [],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "urban",
    description: "Searches the Urban Dictionary library for a definition to the search term.",
    usage: "<search:str>",
    usageDelim: " "
};
