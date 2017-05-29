const slowmode = new Map();
const timers = [];
const ratelimit = 1250;

exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.run = (client, msg) => new Promise((resolve, reject) => {
    // also available: msg.server.id , msg.channel.id
  const slowmodeLevel = msg.author.id;
  const entry = slowmode.get(slowmodeLevel);
  if (!entry) { slowmode.set(slowmodeLevel, true); }
  if (timers[slowmodeLevel]) clearTimeout(timers[slowmodeLevel]);
  timers[slowmodeLevel] = setTimeout(() => {
    slowmode.delete(slowmodeLevel);
    delete timers[slowmodeLevel];
  }, ratelimit);

  if (entry) reject();
  else resolve();
});

exports.help = {};
exports.help.name = "commandSlowMode";
exports.help.type = "inhibitors";
exports.help.description = "Slows down the usage of commands, which defaults to per user.";
