exports.conf = {
  enabled: true,
  // Change to false if the filter should not ignore other bots
  ignoreBots: true,
  // Change to true if the filter should ignore selfBots
  ignoreSelf: false,
};

exports.run = (client, msg) => {
  // Please add the channel ID you want to recieve these reports in.
  const modlog = "CHANNELIDHERE";
  if (msg.deletable) {
    const badWords = msg.guild.settings.swearWords.filter(word => msg.content.toLowerCase().includes(word));
    if (badWords.length > 0) {
      let badWordList = [];
      for (let i = 0; i < badWords.length; i++) {
        badWordList += badWords[i];
      }
      // DM the user regarding what words caused the message to be deleted.
      msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWordList.join(", ")}**`);
      // DM the user with the message incase they wish to copy paste -> edit and resend. Imagine what happens when by accident a user gets the message deleted for a mistake.
      msg.author.send(msg.content);
      // Delete a message
      msg.delete()
        // Send a report of the effect to a channel of your choosing.
        // Please insert your channel id here for the channel you wish to recieve them in.
        .then(client.channels.get(modlog).send(`Deleted message from ${msg.author} that said the \n\n **Naughty Words:** ${badWordList} in the server ${msg.guild} in the channel ${msg.channel}. \n\n **Full Message:** ${msg.content}`))
        .catch(console.error);
    }
  } else {
    // When a message isnt able to be deleted send an alert please add your channel ID here
    client.channels.get(modlog).send(`Sorry this message was not able to be deleted. Author: ${msg.author}\n ${msg.content}`);
  }
};

// Create a swear words setting for every guild 
exports.init = async (client) => {
  const schema = client.settings.guilds.schema;
  if (!schema.swearWords) {
    await client.settings.guilds.add("swearWords", { type: "String", array: true });
  }
};
