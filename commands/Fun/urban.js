const request = require("snekfetch");

exports.run = async (client, msg, [search, resultNum = 0]) => {
  const url = `http://api.urbandictionary.com/v0/define?term=${search}`;
  const body = await request.get(url).then(data => JSON.parse(data.text));
  if (resultNum > 1) resultNum--;

  const result = body.list[resultNum];
  if (!result) return msg.channel.send("No entry found.");
  const wdef = result.definition.length > 1000
    ? `${client.funcs.splitText(result.definition, 1000)}...`
    : result.definition;
  const definition = [
    `**Word:** ${search}`,
    "",
    `**Definition:** ${resultNum + 1} out of ${body.list.length}\n_${wdef}_`,
    "",
    `**Example:**\n${result.example}`,
    `<${result.permalink}>`,
  ].join("\n");

  return msg.channel.send(definition);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: ["splitText"],
  requiredModules: ["snekfetch"],
};

exports.help = {
  name: "urban",
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "<search:str> [resultNum:int]",
  usageDelim: ", ",
  type: "commands",
};
