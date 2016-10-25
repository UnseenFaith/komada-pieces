exports.run = (client, msg, [pref]) => {
    if (!pref) {
        msg.reply(`Your prefix is ${client.config.prefix}`);
        } else {
        //fs.readFile('./index.js', 'UTF8', (err, data) => {
        //let res = data;
        //let res2 = res.replace(client.config.prefix, 'prefix');
        //fs.writeFile('./index.js', res2);
        client.config.prefix = pref;
        msg.reply(`Your prefix has been changed to ${pref}`)
    };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "prefix",
  description: "Find your prefix or change it with this command",
  usage: "[pref:str]",
  usageDelim: " "
};
