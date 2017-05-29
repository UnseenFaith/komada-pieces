/**
  * *Usage*
  * client.funcs.throwError(client, error, channel, file, true/false);
  * {Client} > The client object.
  * {Error} > The error object.
  * {Channel} > The channel in which the message was sent. If it's not defined, it won't sent a message.
  * {File} > The file in which something failed (debug!)
  * {Log} > Boolean, by default it's false, set it to true if you want the error to be logged.
  *
  * TIPS!
  * Use `null` when you don't want to send the message.
  * You can pass `__filename.split(require("path").sep).pop()` for the argument {File} (to get the command's filename).
  * However, you can use a custom name for debug.
  * If you just want to send a custom error message, do `client.funcs.throwError(client, error, channel)`
  */

module.exports = async (client, error, channel, file, log = false) => {
  const permissions = channel.permissionsFor(channel.guild.member(client.user)).hasPermission("SEND_MESSAGES");

  if (channel && permissions) {
    const message = await channel.send(`|\`❌\`| **ERROR**:\n\`\`\`LDIF\n${error}\`\`\``);
    setTimeout(() => { if (message && message.deletable) message.delete(); }, 10000);
  }

  if (log && typeof log === "boolean") client.funcs.log(`${file} | ${error.stack || error}`, "error");
};

exports.help = {};
exports.help.name = "throwError";
exports.help.type = "functions";
exports.help.description = "Centralized error debugger, useful for when you want to send an error message and autodelete it. It's able to send logs aswell.";
exports.conf = {};
exports.conf.requiredModules = [];
