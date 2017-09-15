exports.run = async (client, msg) => {
  if (!msg.guild) return;
  const { modLog, swearWords } = msg.guild.settings;
  if (!msg.deletable && !swearWords.length > 0) return;
  const badWords = swearWords.filter(word => msg.content.toLowerCase().includes(word));
  if (badWords.length > 0) {
    await msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWords.join(", ")}**`);
    await msg.author.send(msg.content);
    msg.delete().then(msg => msg.guild.channels.get(modLog).send(`Deleted message from ${msg.author.tag} that said the \n\n **Naughty Words:** ${badWords} in the server ${msg.guild.name} in the channel ${msg.channel.name}. \n\n **Full Message:** ${msg.content}`))
      .catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  ignoreBots: true,
  ignoreSelf: false,
};

exports.help = {
  name: "filterWords",
  type: "monitors",
  description: "Very powerful word filter. For example, it will filter out the word 'assumption' if you have the word 'ass' on the filter list.",
};

exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.swearWords) {
    await client.settings.guilds.add("swearWords", { type: "String", array: true });
  }
  if (!schema.modLog) {
    await client.settings.guilds.add("modLog", { type: "TextChannel" });
  }
};
