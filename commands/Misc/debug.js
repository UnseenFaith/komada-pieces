const fs = require("fs-extra-promise");
const { sep } = require("path");

const sendHelpMessage = (client, msg, cmd) => client.commands.get("help").run(client, msg, [cmd]);

/* Returns an array of dir (including trailing slash) and filename */
const getPiecePath = async (client, type, name, obj) => {
  // Komada base dirs already end with sep
  const category = (obj.help ? obj.help.category : null) || "General";
  const subCategory = (obj.help ? obj.help.subCategory : null) || "General";
  const catDir = (category === "General" ? "" : sep + category) +
    (subCategory === "General" ? "" : sep + subCategory);
  const clientDir = `${client.clientBaseDir}${type}s${catDir}`;

  // See if it's a client piece (or overrides a core piece)
  return fs.accessAsync(`${clientDir}${sep}${name}.js`)
    .then(() => [`${clientDir}${sep}`, `${name}.js`])
    .catch(() => {
      const coreDir = `${client.coreBaseDir}${type}s${catDir}`;
      return fs.accessAsync(`${coreDir}${sep}${name}.js`)
        .then(() => [`${coreDir}${sep}`, `${name}.js`])
        .catch(() => [null, null]);
    });
};

const sendDebugMessage = async (client, msg, type, name, obj) => {
  const [dir, filename] = await getPiecePath(client, type, name, obj);
  return msg.channel.send(`location :: ${dir}\n${filename}\nType \`${msg.guildConf.prefix}debug ${type} ${name} src\` to see source`, { code: "asciidoc" });
};

const sendSrcMessage = async (client, chan, type, name, obj) => {
  const [dir, filename] = await getPiecePath(client, type, name, obj);
  if (dir && filename) {
    const src = await fs.readFileAsync(dir + filename);
    if (src) return chan.send("js", src, { code: "js", split: true });
    return chan.send("Something went wrong; could not load source", { code: true });
  }
  return chan.send("Could not find piece", { code: true });
};

const runShowPiece = async (client, msg, type, name, obj) => {
  if (type === "command") await sendHelpMessage(client, msg, name);
  return sendDebugMessage(client, msg, type, name, obj);
};

const runShowPieceSrc = (client, msg, type, name, obj) => sendSrcMessage(client, msg.channel, type, name, obj);

const runListPieces = (client, chan, type, pieces) => {
  const piecesNames = pieces instanceof Map ?
    pieces.keyArray() :
    Object.keys(pieces);
  const piecesMsg = piecesNames.length > 0 ?
    piecesNames.reduce((acc, name) => `${acc}, ${name}`) :
    `No ${type}s loaded`;
  return chan.send(piecesMsg, { code: true }).catch(console.error);
};

exports.run = async (client, msg, [type, name, src]) => {
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
    return msg.channel.send(`That ${type} doesn't exist`, { code: true })
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
  type: "commands",
};
