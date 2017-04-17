let LocalStorage;
let fs;

const tables = [];
const config = {
  moduleName: "localStorage",
  enabled: true,
  baseLocation: "./bwd/db/localStorage",
};
exports.conf = config;

exports.debug = (client) => {
  client.funcs.log(tables);
};

exports.init = client =>
   new Promise((resolve, reject) => {
     LocalStorage = require("node-localstorage").LocalStorage;
     fs = require("fs-extra");
     fs.ensureDir(config.baseLocation, (e) => {
       if (e) console.error(e);
       try {
         const test = new LocalStorage(`${config.baseLocation}/system-test`);
         test.clear();
       } catch (e) {
         console.log(e);
         reject(e);
       }
       fs.readdir(config.baseLocation, (err, files) => {
         if (err) console.error(err);
         let c = 0;
         files.forEach((f) => {
           const name = f.split(".")[0];
           tables[name] = new LocalStorage(`${config.baseLocation}/${name}`);
           c++;
         });
         client.funcs.log(`Loaded ${c} tables in ${config.moduleName} database.`);
       });
     });
   });

exports.get = (table, key) =>
   new Promise((resolve, reject) => {
     try {
       const value = tables[table].getItem(key);
       resolve(value);
     } catch (e) {
       reject("Key not found");
     }
   });

exports.has = (table, key) =>
   new Promise((resolve, reject) => {
     try {
       const value = tables[table].getItem(key);
       resolve(!!value);
     } catch (e) {
       reject(e);
     }
   });

exports.set = (table, key, value) =>
   new Promise((resolve, reject) => {
     try {
       resolve(tables[table].setItem(key, value));
     } catch (e) {
       console.log(e);
       reject(e);
     }
   });

exports.delete = (table, key) =>
   new Promise((resolve, reject) => {
     try {
       resolve(tables[table].removeItem(key));
     } catch (e) {
       console.log(e);
       reject(e);
     }
   });

exports.hasTable = tableName =>
   new Promise((resolve, reject) => {
     try {
       resolve(!!tables[tableName]);
     } catch (e) {
       console.log(e);
       reject(e);
     }
   });

exports.createTable = tableName =>
   new Promise((resolve, reject) => {
     try {
       resolve(tables[tableName] = new LocalStorage(`${config.baseLocation}/${tableName}`));
     } catch (e) {
       console.log(e);
       reject(e);
     }
   });

exports.deleteTable = tableName =>
   new Promise((resolve, reject) => {
     try {
       const index = tables.indexOf(tableName);
       if (index > -1) {
         tables[tableName].clear();
         tables.splice(index, 1);
         resolve();
       } else {
         reject("Table name not found in list of available tables.");
       }
     } catch (e) {
       console.log(e);
       reject(e);
     }
   });

exports.help = {};
exports.help.name = "localstorage";
exports.help.type = "providers";
exports.help.description = "Allows you to create a \"local storage\" equivalent from a browser for use in Node.js";
exports.conf = {};
exports.conf.requiredModules = ["fs-extra", "node-localstorage"];
