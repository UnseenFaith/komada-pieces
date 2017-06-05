const clientID = "CLIENT_ID_HERE"; //https://dev.twitch.tv/docs/v5/guides/authentication/

/* eslint-disable no-underscore-dangle */
exports.run = async (client, msg, [twitchName]) => {
  const snekfetch = require("snekfetch");
  const moment = require("moment");
  try {
    const { body } = await snekfetch.get(`https://api.twitch.tv/kraken/channels/${twitchName}?client_id=${clientID}`);
    const creationDate = moment(body.created_at).format("DD-MM-YYYY");
    const embed = new client.methods.Embed()
      .setColor(6570406)
      .setThumbnail(body.logo)
      .setAuthor(body.display_name, "https://i.imgur.com/OQwQ8z0.jpg", body.url)
      .addField("Account ID", body._id, true)
      .addField("Followers", body.followers, true)
      .addField("Created On", creationDate, true)
      .addField("Channel Views", body.views, true);
    await msg.channel.send({embed});
  } catch (e) {
    msg.reply("Unable to find account. Did you spell it correctly?");
    console.log(`Error in twitch.js: ${e}`);
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
