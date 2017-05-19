exports.run = async(client, msg, [twitchName]) => {
    const rp = require("request-promise-native");
    const moment = require('moment');
    const client_id = "CLIENT_ID"; //Get from here: https://dev.twitch.tv/docs/v5/guides/authentication/
    try {
        const res = await rp.get("https://api.twitch.tv/kraken/channels/" + twitchName + "?client_id=" + client_id).then(JSON.parse);
        var a = moment(res.created_at);
        var creationDate = a.format("DD-MM-YYYY");
        const twitchInfo = {
            "description": "",
            "color": 6570406,
            "thumbnail": {
                "url": res.logo
            },
            "author": {
                "name": res.display_name,
                "icon_url": "https://i.imgur.com/OQwQ8z0.jpg",
                "url": res.url
            },
            "fields": [{
                    "name": "Account ID",
                    "value": res._id,
                    "inline": true
                },
                {
                    "name": "Followers",
                    "value": res.followers,
                    "inline": true
                },
                {
                    "name": "Created On",
                    "value": creationDate,
                    "inline": true
                },
                {
                    "name": "Channel Views",
                    "value": res.views,
                    "inline": true
                }
            ]
        };
        msg.channel.sendMessage("Fetching info for " + twitchName + "...").then(msg => {
            msg.edit({
                embed: twitchInfo
            })
        });
    } catch (e) {
        msg.reply("Unable to find account. Did you spell it correctly?");
        console.log("Error in twitch.js: " + e);
    }
};

exports.conf = {
    enabled: true,
    selfbot: false,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    requiredModules: [],
};

exports.help = {
    name: "twitch",
    description: "Get info of twitch acc",
    usage: "<name:str>",
    usageDelim: "",
};