exports.conf = {
  enabled: true,
  priority: 5,
};

exports.run = (client, msg, cmd) => {
  if (cmd.conf.cooldown === 0) return false;
  const cooldown = cmd.conf.cooldown || 1000;
  if (!cmd.cooldown) cmd.cooldown = new Map();
  const remaining = (cooldown - (Date.now() - cmd.cooldown.get(msg.author.id))) / 1000;
  if (cmd.cooldown.has(msg.author.id)) return `You are being ratelimited. Wait until ${remaining}s`;
  cmd.cooldown.set(msg.author.id, Date.now());
  setTimeout(() => cmd.cooldown.delete(msg.author.id), cooldown);
  return false;
};

exports.help = {};
exports.help.name = "cooldown";
exports.help.type = "inhibitors";
exports.help.description = "[v2] Add per-command cooldown to single users.";

/**
  * *Usage*
  * In https://komada.js.org/creating-commands.html, you have this object in every command:
  *   exports.conf = {
  *     enabled: true,
  *     runIn: ["text"],
  *     aliases: [],
  *     permLevel: 0,
  *     botPerms: [],
  *     requiredFuncs: [],
  *   };
  * Then, you add: cooldown: {time}
  * In which, {time} is the amount of time in milliseconds you want to ratelimit the command.
  * To disable the cooldown in a certain command, set {cooldown} as 0.
  */
