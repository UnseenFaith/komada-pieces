const provider = "json";

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

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "points",
  type: "functions",
  description: "Adds a point system for users accesible through a database.",
};

module.exports.init = async (client) => {
  if (client.providers.has(provider)) this.provider = client.providers.get(provider);
  else throw new Error(`The Provider ${provider} does not seem to exist.`);
  if (!(await this.provider.hasTable("quiz"))) {
    const SQLCreate = ["id TEXT NOT NULL UNIQUE", "points INTEGER NOT NULL DEFAULT 0"];
    await this.provider.createTable("quiz", SQLCreate);
  }
};
