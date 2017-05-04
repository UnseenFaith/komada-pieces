const fs = require("fs-extra-promise");
const sep = require("path").sep;

async function sendHelpMessage(client, msg, cmd) {
  return client.commands.get("help").run(client, msg, [cmd]);
}

/**
 * Returns a vector of dir (including trailing slash) and filename
 */
async function getPiecePath(client, type, name, obj) {
  // Komada base dirs already end with sep
  const category = obj.help.category;
  const subCategory = obj.help.subCategory;
  const catDir = (category === "General" ? "" : sep + category) +
    (subCategory === "General" ? "" : sep + subCategory);
  const dir = `${client.clientBaseDir}${type}s${catDir}`;

  try {
    // See if it's a client piece (or overrides a core piece)
    await fs.accessAsync(`${dir}${sep}${name}.js`);
    return [`${dir}${sep}`, `${name}.js`];
  } catch (_) {
    // It must be a core piece
    const dir = `${client.coreBaseDir}${type}s${catDir}`;
    try {
      await fs.accessAsync(`${dir}${sep}${name}.js`);
      return [`${dir}${sep}`, `${name}.js`];
    } catch (_) {
      // Or...maybe not. Can't find it ¯\_(ツ)_/¯
      return [null, null];
    }
  }
}

async function sendDebugMessage(client, msg, type, name, obj) {
  const [dir, filename] = await getPiecePath(client, type, name, obj);
  msg.channel.sendCode("asciidoc", `location :: ${dir}
        src ${filename}
     actual ${name}.js
Type \`${msg.guildConf.prefix}debug command ${name} src\` to see source`);
}

async function sendSrcMessage(client, chan, type, name, obj) {
  const [dir, filename] = await getPiecePath(client, type, name, obj);
  if (dir && filename) {
    const src = await fs.readFileAsync(dir + filename);
    if (src) {
      chan.sendCode("js", src, { split: true });
    } else {
      chan.sendCode("", "Something went wrong; could not load source");
    }
  } else {
    chan.sendCode("", "Could not find piece");
  }
}

exports.run = (client, msg, [type, name, src]) => {
  const obj = {
    command: client.commands,
    inhibitor: client.commandInhibitors,
    monitor: client.messageMonitors,
    function: client.funcs,
    provider: client.providers,
  }[type].get(name);
  if (src) {
    sendSrcMessage(client, msg.channel, type, name, obj).catch(console.error);
  } else if (type === "command") {
    sendHelpMessage(client, msg, name)
      .then(() => sendDebugMessage(client, msg, type, name, obj)
        .catch(console.error))
      .catch(console.error);
  } else {
    sendDebugMessage(client, msg, type, name, obj).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "debug",
  description: "Show debugging info on some thing.",
  usage: "<command|inhibitor|monitor|function|provider> <name:str> [src]",
  usageDelim: " ",
  extendedHelp: "",
};
