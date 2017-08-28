exports.run = async (client, msg, [user, name]) => {
  // Checks to see if the nickname is too long or too short for the discord requirement if so replies and then exits.
  if (name.length > 32 || name.length === 0) {
    msg.reply("Sorry the nickname was too long or too short.");
    return;
  }
  // Set the nickname
  user.setNickname(name);
  // Send a reply saying it is done
  msg.reply(`Nickname has been changed to ${name} for ${user} :smiley:`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["nick"],
  permLevel: 2,
  botPerms: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "nickname",
  description: "Change nickname of a user",
  usage: "<user:member> <name:str{1,32}>",
  usageDelim: " ",
  extendedHelp: "1) User will require a role called Moderators\n2) Bot will require a role higher than the user to be able to change nickname.\n3) Up to a maximum of 3 words with spaces and max characters must be 32 or less.",
};
