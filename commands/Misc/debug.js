const fs = require("fs-extra-promise");
const sep = require("path").sep;

async function sendHelpMessage(client, msg, cmd) {
  return client.commands.get("help").run(client, msg, [cmd]);
}

/**
 * Returns an array of dir (including trailing slash) and filename
 */
async function getPiecePath(client, type, name, obj) {
  // Komada base dirs already end with sep
  const category = (obj.help ? obj.help.category : null) || "General";
  const subCategory = (obj.help ? obj.help.subCategory : null) || "General";
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
            ${filename}
Type \`${msg.guildConf.prefix}debug ${type} ${name} src\` to see source`);
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

function runShowPiece(client, msg, type, name, obj) {
  if (type === "command") {
    return sendHelpMessage(client, msg, name)
      .then(() => sendDebugMessage(client, msg, type, name, obj)
        .catch(console.error))
      .catch(console.error);
  }
  return sendDebugMessage(client, msg, type, name, obj).catch(console.error);
}

function runShowPieceSrc(client, msg, type, name, obj) {
  return sendSrcMessage(client, msg.channel, type, name, obj)
    .catch(console.error);
}

function runListPieces(client, chan, type, pieces) {
  const piecesNames = pieces instanceof Map ?
    pieces.keyArray() :
    Object.keys(pieces);
  const piecesMsg = piecesNames.length > 0 ?
    piecesNames.reduce((acc, name) => `${acc}, ${name}`) :
    `No ${type}s loaded`;
  return chan.sendCode("", piecesMsg).catch(console.error);
}

exports.run = (client, msg, [type, name, src]) => {
  const pieces = client[{
    command: "commands",
    inhibitor: "commandInhibitors",
    monitor: "messageMonitors",
    function: "funcs",
    provider: "providers",
  }[type]];
  if (name === "*") {
    return runListPieces(client, msg.channel, type, pieces);
  }
  const obj = pieces instanceof Map ?
    pieces.get(name) :
    pieces[name];
  if (!obj) {
    return msg.channel.sendCode("", `That ${type} doesn't exist`)
      .catch(console.error);
  }
  if (src) {
    return runShowPieceSrc(client, msg, type, name, obj);
  }
  return runShowPiece(client, msg, type, name, obj);
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
  description: "Show debugging info on some thing or list all things.",
  usage: "<command|inhibitor|monitor|function|provider> <name:str> [src]",
  usageDelim: " ",
  extendedHelp: "Use `*` as name to list all pieces of that type.",
};
