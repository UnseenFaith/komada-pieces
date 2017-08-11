module.exports = async (client, user, action) => {
  let row = await this.provider.get("quiz", user);
  if (!row) {
    await this.provider.create("quiz", user, { points: 0 });
    row = { id: user, points: 0 };
  }
  let points = row.points;
  switch (action) {
    case "add":
      points++;
      break;
    case "remove":
      Math.max(0, points--);
      break;
    case "reset":
      points = 0;
      break;
    // no default
  }
  await this.provider.update("quiz", user, { points });
};

module.exports.providerEngine = "json";

module.exports.init = async (client) => {
  if (client.providers.has(this.providerEngine)) this.provider = client.providers.get(this.providerEngine);
  else throw new Error(`The Provider ${this.providerEngine} does not seem to exist.`);
  if (!(await this.provider.hasTable("quiz"))) {
    const SQLCreate = ["id TEXT NOT NULL UNIQUE", "points INTEGER NOT NULL DEFAULT 0"];
    await this.provider.createTable("quiz", SQLCreate);
  }
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "points",
  type: "functions",
  description: "Adds a point system for users accesible through an SQLite database.",
};
