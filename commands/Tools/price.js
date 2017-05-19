exports.run = async(client, msg, [coin, currency]) => {
    const rp = require("request-promise-native");
    var c1 = coin.toUpperCase();
    var c2 = currency.toUpperCase();
    try {
	const res = await rp.get("https://min-api.cryptocompare.com/data/price?fsym="+c1+"&tsyms="+c2).then(JSON.parse);
	if (!res[c2]) {
		msg.reply("There was an error, please make sure you specified an appropriate coin and currency.")
	} else {
	msg.reply("Current " + c1 + " price is " + res[c2] + " " + c2);
    }
    } catch (e) {
    msg.reply("There was an error, please make sure you specified an appropriate coin and currency.");
  }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "price",
    description: "Returns the current price of a Cryptocurrency Coin.",
    usage: "<coin:str> <currency:str>",
    usageDelim: " ",
};