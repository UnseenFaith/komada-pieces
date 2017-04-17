exports.run = async (client, msg, [search, resultNum = 0]) => {
  const rp = require("request-promise-native"); // eslint-disable-line global-require
  const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
  const theUrl = baseUrl + search;
  try {
    const body = await rp.get(theUrl).then(JSON.parse);
    if (resultNum > 1) resultNum -= 1;

    const result = body.list[resultNum];
    if (!result) throw new Error("No entry found.");
    const wdef = result.definition.length > 1000
      ? `${client.funcs.splitText(result.definition, 1000)}...`
      : result.definition;
    const definition = [
      `**Word:** ${search}`,
      "",
      `**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${wdef}_`,
      "",
      `**Example:**\n${result.example}`,
      `<${result.permalink}>`,
    ].join("\n");

    await msg.channel.send(definition);
  } catch (e) {
    msg.channel.send("No entry found.");
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ["splitText"],
  requiredModules: ["request-promise-native"],
};

exports.help = {
  name: "urban",
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "<search:str> [resultNum:int]",
  usageDelim: ", ",
  type: "commands",
};
