const run = (client, msg, action) => (
  new Promise((resolve) => {
    const db = client.providers.get("sqlite");
    if (!db) return msg.reply("You didn't install the SQlite provider. Download it from our Pieces repo!");

    db.get(client, "quiz", "userID", msg.author.id).then((row) => {
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
        default:
          break;
      }
      db.update(client, "quiz", ["points"], [points], "userID", msg.author.id)
        .then(() => resolve(points));
    }).catch((e) => {
      client.funcs.log(e, "error");
      const points = action === "add" ? 1 : 0;
      db.update(client, "quiz", ["points"], [points], "userID", msg.author.id)
        .then(() => resolve(points));
    });
  })
);

const init = client => (
  new Promise((resolve, reject) => {
    if (!client.providers.first()) {
      reject("No Database Found");
    }
    client.databaseModules.get("sqlite").hasTable(client, "quiz")
      .then((res) => {
        if (!res) {
          const keys = "<userID:str> <points:int>";
          client.databaseModules.get("sqlite").createTable(client, "quiz", keys);
        }
        client.config.init.push("points");
        resolve();
      });
  })
);

module.exports = (client, msg, action) => (
  new Promise((resolve, reject) => {
    if (!client.config.init.includes("points")) {
      init(client)
        .then(() => {
          run(client, msg, action)
            .then((p) => {
              resolve(p);
            });
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      run(client, msg, action)
        .then((p) => {
          resolve(p);
        });
    }
  })
);

exports.help = {};
exports.help.name = "points";
exports.help.description = "Adds a point system for users accesible through an SQLite database.";
exports.conf = {};
exports.conf.requiredModules = [];
