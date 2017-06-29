// TODO: Pending for rewrite.
module.exports = async (client, msg, action) => {
  const db = client.providers.get("sqlite");
  if (!db) return msg.reply("You didn't install the SQlite provider. Download it from our Pieces repo!");

  try {
    const row = await db.get(client, "quiz", "userID", msg.author.id);
    let points = row.points;
    switch (action) {
      case "add":
        points++;
        break;
      case "remove":
        if (points <= 0) break;
        points--;
        break;
      case "reset":
        points = 0;
        break;
      // no default
    }
    await db.update(client, "quiz", ["points"], [points], "userID", msg.author.id);
    return points;
  } catch (e) {
    client.funcs.log(e, "error");
    const points = action === "add" ? 1 : 0;
    await db.update(client, "quiz", ["points"], [points], "userID", msg.author.id);
    return points;
  }
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "points",
  type: "functions",
  description: "Adds a point system for users accesible through an SQLite database.",
};

module.exports.init = async (client) => {
  if (!client.providers.first()) throw "No Database Found";
  const res = await client.databaseModules.get("sqlite").hasTable(client, "quiz");
  if (!res) {
    const keys = "<userID:str> <points:int>";
    client.databaseModules.get("sqlite").createTable(client, "quiz", keys);
  }
  client.config.init.push("points");
  return null;
};
