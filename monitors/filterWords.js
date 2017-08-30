exports.run = async (client, msg) => {
  const modlog = msg.guild.settings.modLog;
  if (msg.deletable) {
    if (msg.guild.settings.swearWords) {
      const badWords = msg.guild.settings.swearWords.filter(word => msg.content.toLowerCase().includes(word));
      if (badWords.length > 0) {
        let badWordList = [];
        for (let i = 0; i < badWords.length; i++) {
          badWordList.push(badWords[i]);
        }
        await msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWordList.join(", ")}**`);
        await msg.author.send(msg.content);
        await msg.delete()
          .then(client.channels.get(modlog).send(`Deleted message from ${msg.author} that said the \n\n **Naughty Words:** ${badWordList} in the server ${msg.guild} in the channel ${msg.channel}. \n\n **Full Message:** ${msg.content}`))
          .catch(console.error);
      }
    }
  } else {
    const serverOrDM = msg.guild ? `Server: ${msg.guild}` : "Message was sent in a DM"
    client.channels.get(modlog).send(`Sorry this message was not able to be deleted. Author: ${msg.author} ${serverOrDM}\n ${msg.content}`);
  }
};

exports.conf = {
  enabled: true,
  ignoreBots: false,
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
