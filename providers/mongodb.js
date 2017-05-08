let db;
const config = {
  moduleName: "mongo",
  enabled: true,
  dbName: "Komada",
  dbURL: "mongodb://localhost:27017/",
};

// Collection Methods. Collections are implicitly created with document methods regardess.
exports.createCollection = (name, options) => connect().then(db => db.createCollection(name, options));

exports.dropCollection = name => connect().then(db => db.dropCollection(name));

// Document Methods. Update requires MongoDB Update Operators. Be sure to refer to MongoDB documentation.
exports.all = collection => connect().then(db => db.collection(collection).find({}).toArray());

exports.get = (collection, id) => connect().then(db => db.collection(collection).findOne({ id }));

exports.add = (collection, docObj) => connect().then(db => db.collection(collection).insertOne(docObj));

exports.delete = (collection, id) => connect().then(db => db.collection(collection).deleteOne({ id }));

exports.update = (collection, filter, updateObj) => connect().then(db => db.collection(collection).updateOne(filter, updateObj));

exports.replace = (collection, filter, repDoc) => connect().then(db => db.collection(collection).replaceOne(filter, repDoc));


exports.help = {};
exports.help.name = "mongodb";
exports.help.type = "providers";
exports.help.description = "Allows you use MongoDB functionality throughout Komada.";
exports.conf = config;
exports.conf.requiredModules = ["mongodb"];

exports.init = () => {
  db = require("mongodb").MongoClient;
};

const connect = () => db.connect(`${config.dbURL}${config.dbName}`);
