const slowmode = new Map();
const timers = [];
const ratelimit = 1250;

exports.run = (client, msg) => {
  const slowmodeLevel = msg.author.id;
  const entry = slowmode.get(slowmodeLevel);
  if (!entry) { slowmode.set(slowmodeLevel, true); }
  if (timers[slowmodeLevel]) clearTimeout(timers[slowmodeLevel]);
  timers[slowmodeLevel] = setTimeout(() => {
    slowmode.delete(slowmodeLevel);
    delete timers[slowmodeLevel];
  }, ratelimit);

  return !!entry;
};

exports.conf = {
  enabled: true,
  requiredModules: [],
};

exports.help = {
  name: "commandSlowMode",
  type: "inhibitors",
  description: "Slows down the usage of commands, which defaults to per user.",
};
