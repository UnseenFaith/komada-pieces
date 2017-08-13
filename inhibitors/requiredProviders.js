exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 6,
};

/* eslint-disable no-prototype-builtins */
exports.run = (client, msg, cmd) => {
  if (!cmd.conf.requiredProviders || cmd.conf.requiredProviders.length === 0) return false;
  const providers = cmd.conf.requiredProviders.filter(provider => !client.providers.has(provider));
  if (providers.length > 0) return `The client is missing the **${providers.join(", ")}** provider${providers.length > 1 ? "s" : ""} and cannot run.`;
  return false;
};
