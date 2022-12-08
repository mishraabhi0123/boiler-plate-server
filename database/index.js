const mongoose = require("mongoose");
const schemas = require("./schemas");

class Database {
  constructor() {
    Object.entries(schemas).forEach(([schemaName, schema]) => {
      this[schemaName] = mongoose.model(schemaName, schema); 
    });
  }

  async connect(DB_URL) {
    if (!DB_URL) {
      throw new Error("Invalid database url - ", DB_URL)
    }
    mongoose.set('strictQuery', false);
    return new Promise((resolve, reject) => {
      mongoose.connect(DB_URL, resolve, reject)
    })
  }
}

module.exports = new Database()