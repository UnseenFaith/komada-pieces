exports.conf = {
  enabled: true,
  // Change to true if the filter should ignore other bots
  ignoreBots: false,
  // Change to true if the filter should ignore selfBots
  ignoreSelf: false,
};

exports.run = (client, msg) => {
  // Add your list of words you want to filter. This is a very powerful filter so be careful of using. For example, the word 'assign' will not be allowed if the word `ass` is present in the swear words. In other filters, they are easily breakable by typing 'ass.' but this filter will delete these types of breaks.
  const swearWords = ["damn", "shucks", "frak", "ass"];

  const badWords = swearWords.filter(word => msg.content.toLowerCase().includes(word));
  if (badWords.length > 0) {
    let badWordList = [];
    for (let i = 0; i < badWords.length; i++) {
      badWordList += badWords[i];
    }
    // DM the user regarding what words caused the message to be deleted.
    msg.author.send(`I deleted the message below because you used a word that is not allowed. : **${badWordList}**`);
    // DM the user with the message incase they wish to copy paste -> edit and resend. Imagine what happens when by accident a user gets the message deleted for a mistake.
    msg.author.send(`${msg.content}`);
    // Delete a message
    msg.delete()
      // Send a report of the effect to a channel of your choosing.
      // Please insert your channel id here for the channel you wish to recieve them in.
      .then(client.channels.get("CHANNELIDHERE").send(`Deleted message from ${msg.author} that said the \n\n **Naughty Words:** ${badWordList} in the server ${msg.guild} in the channel ${msg.channel}. \n\n **Full Message:** ${msg.content}`))
      .catch(console.error);
  }
};
