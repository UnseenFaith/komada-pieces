exports.run = async(client, msg, [twitchName]) => {
    const snekfetch = require('snekfetch');
    const moment = require('moment');
    const client_id = "CLIENT_ID_HERE"; //Get From Here: https://dev.twitch.tv/docs/v5/guides/authentication/
    try {
        const res = await snekfetch.get("https://api.twitch.tv/kraken/channels/" + twitchName + "?client_id=" + client_id);
        var a = moment(res.body.created_at);
        const creationDate = a.format("DD-MM-YYYY");
        const twitchInfo = {
            "description": "",
            "color": 6570406,
            "thumbnail": {
                "url": res.body.logo
            },
            "author": {
                "name": res.body.display_name,
                "icon_url": "https://i.imgur.com/OQwQ8z0.jpg",
                "url": res.body.url
            },
            "fields": [{
                    "name": "Account ID",
                    "value": res.body._id,
                    "inline": true
                },
                {
                    "name": "Followers",
                    "value": res.body.followers,
                    "inline": true
                },
                {
                    "name": "Created On",
                    "value": creationDate,
                    "inline": true
                },
                {
                    "name": "Channel Views",
                    "value": res.body.views,
                    "inline": true
                }
            ]
        };
        msg.channel.send("Fetching info for " + twitchName + "...").then(msg => {
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
    description: "Returns information on a Twitch.tv Account",
    usage: "<name:str>",
    usageDelim: "",
};