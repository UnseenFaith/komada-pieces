const fsp = require("fs-promise");
const moment = require("moment");
require("moment-duration-format");

exports.init = (client) => {
  if (!client.funcs.confs.hasKey("starboard")) {
    client.funcs.confs.addKey("starboard", "");
  }
};

exports.run = (client, msg, [message]) => {
  if (!msg.guildConf.starboard) {
    if (!msg.guild.channels.exists("name", "starboard")) {
      msg.reply("Please create the _starboard_ channel and try again.").catch(error => console.log(error.stack));
      return;
    } else {
      client.funcs.confs.set(msg.guild, "starboard", msg.guild.channels.find("name", "starboard").id);
    }
  } else {
    if (!fsp.existsSync(`./data/${message.guild.id}.json`)) fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify([], null, "\t"));
    const star = message;
    var msgArray = JSON.parse(fsp.readFileSync(`./data/${message.guild.id}.json`, "utf8"));
    if (msgArray.includes(star.id)) {
      message.channel.sendMessage("This message has already been starred.").catch(error => console.log(error.stack));
      return;
    }
    if (msg.author === star.author) {
      message.channel.sendMessage("You cannot star yourself.").catch(error => console.log(error.stack));
      return;
    }
    if (star.attachments.first()) {
      star.attachments.map(a => a.url).join(" ").then(file => {
        client.channels.get(msg.guildConf.starboard).sendFile(file, star.attachments.map(a => a.filename).join(" "), `${star.cleanContent} - ${moment(star.createdTimestamp).format("D[/]M[/]Y [@] HH:mm:ss")} by ${star.author.username}#${star.author.discriminator} in #${star.channel.name} (ID: ${star.id})`).then(message => {
          msgArray.push(star.id);
          fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
          message.addReaction("⭐").catch(error => console.log(error.stack));
          client.channels.get(msg.channel.id).sendMessage("Successfully starred!").catch(error => console.log(error.stack));
        }).catch(error => console.log(error.stack));
      }).catch(error => console.log(error.stack));
    } else {
      client.channels.get(msg.guildConf.starboard).sendMessage(`${star.cleanContent} - ${moment(star.timestamp).format("D[/]M[/]Y [@] HH:mm:ss")} by ${star.author.username}#${star.author.discriminator} in ${star.channel}, (ID: ${star.id})`).then(message => {
        msgArray.push(star.id);
        fsp.writeFileSync(`./data/${message.guild.id}.json`, JSON.stringify(msgArray, null, "\t"));
        message.addReaction("⭐").catch(error => console.log(error.stack));
        client.channels.get(msg.channel.id).sendMessage("Successfully starred!").catch(error => console.log(error.stack));
      }).catch(error => console.log(error.stack));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  selfbot: false,
  aliases: ["star"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: []
};

exports.help = {
  name: "starboard",
  description: "Stars a message",
  usage: "<messageid:msg>",
  usageDelim: ""
};
