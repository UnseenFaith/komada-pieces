const { resolve } = require("path");
const { Collection } = require("discord.js");
const { promisifyAll } = require("tsubaki");
const Datastore = require("nedb-core");

promisifyAll(Datastore.prototype);

class NeDB {
  /**
   * Creates an instance of the NeDB class
   * @param {string} [name="komada"] Name of the Datastore
   * @param {boolean} [persistent=true] Is Persistent?
   * @constructor NeDB
   */
  constructor(name = "komada", persistent = true) {
    this.name = name;
    this.persistent = persistent;
    this.db = null;
  }

  /**
   * Connects to the NeDB datastore and populates this.db
   * @param {?Client} client Komada Client
   * @returns {Datastore} The NeDB Datastore itself
   */
  connect(client) {
    return this.db = new Datastore(this.persistent ? { filename: resolve(client.clientBaseDir, "bwd", "provider", `${this.name}-nedb.db`), autoload: true } : {}); // eslint-disable-line no-return-assign
  }

  /**
   * Inserts a Document into the Datastore
   * @param {Object} doc Object containing the Document to be inserted into the Datastore
   * @returns {Promise<number>} Returns a Promise containing the Document inserted.
   */
  insert(doc) {
    return this.db.insertAsync(doc);
  }

  /**
   * Updates a Document that matches the query, either with a new Document or using NeDB Update Operators
   * @param {Object} query Query Object
   * @param {Object} updateDoc Object to update Document with. Can be a new Document or Update Modifiers can be used. (Mutually Exclusive)
   * @returns {Promise<number>} Returns a Promise containing the number of Documents Updated. (Either 0 or 1)
   */
  update(query, updateDoc) {
    return this.db.updateAsync(query, updateDoc);
  }

  /**
   * Deletes a Document that matches the query.
   * @param {Object} query Query Object containing property(s) to match
   * @param {boolean} [all=false] Option to delete all documents that match the query
   * @returns {Promise<number>} Returns a Promise with the number of documents deleted.
   */
  delete(query, all = false) {
    return this.db.removeAsync(query, { multi: all });
  }

  /**
   * Deletes all Documents in the Datastore.
   * @returns {Promise<number>} Returns a Promise with the number of documents deleted.
   */
  deleteAll() {
    return this.delete({}, true);
  }

  /**
   * Retrieves all Documents in the Datastore
   * @returns {Promise<Array>} Returns a Promise containing an array of all Documents.
   */
  all() {
    return this.db.findAsync({});
  }

  /**
   * Retrieves a single Document from the Datastore.
   * @param {Object} query Query Object containing property(s) to match
   * @returns {Promise<?Object>} Returns a Promise containing the Document
   */
  get(query) {
    return this.db.findOneAsync(query);
  }

  /**
   * Counts the number of Documents in the Datastore and returns the value based on a query.
   * @param {Object} [query={}] Query Object containing property(s) to match
   * @returns {Promise<number>} Returns a Promise containing the number of Documents in the Datastore per Query.
   */
  count(query = {}) {
    return this.db.countAsync(query);
  }
}

class NeDBManager {
  /**
   * Creates an instance of NeDBManager.
   * @property {Collection} this.datastores
   * @constructor NeDBManager
   */
  constructor() {
    this.datastores = new Collection();
  }

  /**
   * Adds a NeDB Datastore Instance to the Manager
   * @param {string} name Name of the Datastore
   * @param {boolean} [persistent=false] Is Persistent?
   */
  addDatastore(name, persistent = false) {
    if (this.datastores.has(name)) return;
    const db = new NeDB(name, persistent);
    db.connect();
    this.datastores.set(name, db);
  }

  /**
   * Removes a NeDB Datastore Instance from the Manager
   * @param {string} name Name of the Datastore
   */
  removeDatastore(name) {
    if (!this.datastores.has(name)) return;
    this.datastores.delete(name);
  }

  /**
   * Clears all Datastores from the Manager
   * @returns {null}
   */
  clearManager() {
    return this.datastores.clear();
  }
}

module.exports = { NeDB, NeDBManager };
