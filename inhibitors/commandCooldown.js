// Add this to the export.conf of any command to implement a cooldown per command
//
// cooldowns: {
//     //Is the cooldown per player or guild
//     scope: "guild",
//     time: 15000
// }

const cooldowns = new Map();

exports.conf = {
  enabled: false,
  requiredModules: [],
};

exports.run = (client, msg, cmd) => new Promise((resolve, reject) => {
  const commandName = cmd.help.name;

        // default behaviour
        // change this to msg.channel.id or msg.guild.id to override default behaviour
  let id = msg.author.id;

  const standardCooldown = 1000;
  let commandCooldown = standardCooldown;

        // Override default behaviour if command.conf has cooldown variable
  if (cmd.conf.cooldown) {
    if (cmd.conf.cooldown.scope === "guild") {
      id = msg.guild.id;
    }

    commandCooldown = cmd.conf.cooldown.time;
  }
  let entry = false;

  if (!cooldowns.get(id)) cooldowns.set(id, {});

  if (!cooldowns.get(id)[commandName]) cooldowns.get(id)[commandName] = createTimeOut();
  else entry = true;

  if (entry && commandCooldown !== standardCooldown) {
    let message = `Please wait ${commandCooldown / 1000} second(s) between !${
                commandName} commands.`;

    if (id === msg.guild.id) message += "\nThe cooldown for this command is shared across the guild.";

    msg.channel.sendCode("asciidoc", message);
  }

  function createTimeOut() {
    return setTimeout(() => {
      const userCooldownBooleans = cooldowns.get(id);
      delete userCooldownBooleans[commandName];

                // delete key in map when its value is empty, just to keep the map clear
      if (Object.keys(userCooldownBooleans).length === 0) {
        cooldowns.delete(id);
      }
    }, commandCooldown);
  }

  if (entry) reject();
  else resolve();
});


exports.help = {};
exports.help.name = "commandCooldown";
exports.help.type = "inhibitors";
exports.help.description = "Puts commands that have the valid configuration on cooldown, by default per user.";
