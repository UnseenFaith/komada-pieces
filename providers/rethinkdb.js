let r;
const config = {
  moduleName: "rethink",
  enabled: true,
  db: "Komada",
};

class RethinkDB {
  constructor() {
    this.hasTable = RethinkDB.hasTable;
    this.sync = RethinkDB.sync;
    this.createTable = RethinkDB.createTable;
    this.deleteTable = RethinkDB.deleteTable;

    this.all = RethinkDB.all;
    this.get = RethinkDB.get;
    this.getRandom = RethinkDB.getRandom;
    this.add = RethinkDB.add;
    this.update = RethinkDB.update;
    this.replace = RethinkDB.replace;
    this.delete = RethinkDB.delete;
  }

  /* Table methods */
  static hasTable(table) {
    return r.tableList().run()
      .then(data => data.includes(table));
  }

  static sync(table) {
    return RethinkDB.hasTable(table).then((data) => {
      if (!data) throw new Error("This table does not exist.");
      return r.sync(table).run();
    });
  }

  static createTable(table) {
    return RethinkDB.hasTable(table).then((data) => {
      if (data) throw new Error("This table already exists.");
      return r.tableCreate(table).run();
    });
  }

  static deleteTable(table) {
    return RethinkDB.hasTable(table).then((data) => {
      if (!data) throw new Error("This table does not exist.");
      return r.tableDrop(table).run();
    });
  }

  /* Document methods */
  static all(table) {
    return r.table(table) || null;
  }

  static get(table, id) {
    return r.table(table).get(id) || null;
  }

  static getRandom(table) {
    return RethinkDB.all(table).then(data => data[Math.floor(Math.random() * data.length)]);
  }

  static add(table, doc) {
    if (!(doc instanceof Object)) throw new Error("Invalid input");
    return r.table(table).insert(doc).run();
  }

  static update(table, id, doc) {
    if (!(doc instanceof Object)) throw new Error("Invalid input");
    return RethinkDB.get(table, id).then((data) => {
      if (!data) throw new Error("Document not found.");
      return data.update(doc).run();
    });
  }

  static replace(table, id, doc) {
    if (!(doc instanceof Object)) throw new Error("Invalid input");
    return RethinkDB.get(table, id).then((data) => {
      if (!data) throw new Error("Document not found.");
      return data.replace(doc).run();
    });
  }

  static delete(table, id, doc) {
    if (!(doc instanceof Object)) throw new Error("Invalid input");
    return RethinkDB.get(table, id).then((data) => {
      if (!data) throw new Error("Document not found.");
      return data.delete().run();
    });
  }
}

exports.help = {};
exports.help.name = "rethinkdb";
exports.help.type = "providers";
exports.help.description = "Allows you use rethinkDB functionality throughout Komada.";
exports.conf = config;
exports.conf.requiredModules = ["rethinkdbdash"];

/* eslint-disable global-require */
exports.init = (client) => {
  r = require("rethinkdbdash")(config.db);
  client.rethinkdb = RethinkDB;
};
