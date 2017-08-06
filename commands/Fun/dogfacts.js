/*since the catfacts piece in Komada doesn't work, here's an alternative: 
Uses dogs since cats are overrated anyway. 
uses a lightweight npm module instead of html parsing
*/

const dogFacts = require('dog-facts');
exports.run = (client, msg) => {
  let randomFact = dogFacts.random();
  msg.channel.send(randomFact).catch(console.error)
};

exports.help = {
  name: "dogfact",
  description: "Gives you a random dog fact.",
  usage: "",
  usageDelim: "",
  type: 'commands'
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ['dog-facts'],
};
