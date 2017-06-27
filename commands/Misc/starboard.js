const moment = require("moment");
require("moment-duration-format");

exports.providerEngine = "json";

exports.init = async (client) => {
  if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
  if (!(await this.provider.hasTable("starboard"))) await this.provider.createTable("starboard");
};

const generateMessage = (message) => {
  const starTime = moment(message.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss");
  const starFooter = `${message.author.tag} in #${message.channel.name} (ID: ${message.id})`;
  return `⭐ ${message.cleanContent}\n\n- ${starTime} by ${starFooter}`;
};

exports.run = async (client, msg, [message]) => {
  const channel = msg.guild.channels.find("name", "starboard");
  if (!channel) return msg.channel.send("Please create the _starboard_ channel and try again.");
  if (channel.postable === false) return msg.channel.send(`I require the permission SEND_MESSAGES to post messages in ${channel} channel.`);
  if (!(await this.provider.has("starboard", message.guild.id))) await this.provider.set("starboard", message.guild.id, []);
  const msgArray = JSON.parse(await this.provider.get("starboard", message.guild.id));
  if (msgArray.includes(message.id)) return message.channel.send("This message has already been starred.");
  else if (msg.author === message.author) return message.channel.send("You cannot star yourself.");
  const options = {};
  if (message.attachments.first()) options.files = message.attachments.map(a => ({ name: a.filename, attachment: a.url }));

  await channel.send(generateMessage(message), options);
  msgArray.push(message.id);
  await this.provider.replace("starboard", message.guild.id, JSON.stringify(msgArray));
  await message.addReaction("⭐").catch(() => null);
  return msg.channel.send("Successfully starred!");
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["star"],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["moment", "moment-duration-format"],
};

exports.help = {
  name: "starboard",
  description: "Stars a message",
  usage: "<messageid:msg>",
  usageDelim: "",
  type: "commands",
};
