exports.run = (client, msg, cmd) => {
  if (!cmd.conf.nsfw || msg.channel.nsfw) return false;
  return "This command is only available in NSFW channels.";
};

exports.conf = {
  enabled: true,
  priority: 5,
};

exports.help = {
  name: "nsfw",
  type: "inhibitors",
  description: "Commands marked as NSFW are only allowed in NSFW channels.",
};
