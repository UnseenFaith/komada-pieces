const run = (client, msg, action) => new Promise(async (resolve) => { // eslint-disable-line consistent-return
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
    resolve(points);
  } catch (e) {
    client.funcs.log(e, "error");
    const points = action === "add" ? 1 : 0;
    await db.update(client, "quiz", ["points"], [points], "userID", msg.author.id);
    resolve(points);
  }
});

const init = client => new Promise(async (resolve, reject) => {
  if (!client.providers.first()) reject("No Database Found");
  const res = await client.databaseModules.get("sqlite").hasTable(client, "quiz");
  if (!res) {
    const keys = "<userID:str> <points:int>";
    client.databaseModules.get("sqlite").createTable(client, "quiz", keys);
  }
  client.config.init.push("points");
  resolve();
});

module.exports = (client, msg, action) => new Promise(async (resolve, reject) => {
  try {
    if (!client.config.init.includes("points")) {
      await init(client);
      const p = await run(client, msg, action);
      resolve(p);
    } else {
      const p = await run(client, msg, action);
      resolve(p);
    }
  } catch (e) {
    reject(e);
  }
});

exports.help = {};
exports.help.name = "points";
exports.help.type = "functions";
exports.help.description = "Adds a point system for users accesible through an SQLite database.";
exports.conf = {};
exports.conf.requiredModules = [];
