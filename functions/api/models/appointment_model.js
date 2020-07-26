const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class ApptsModel {
  constructor() {
    if (this.instance) return this.instance;
    ApptsModel.instance = this;
  }

  get() {
    return database.getList("appointment");
  }

  getById(id) {
    return database.get("appointment", id);
  }

  create(appt) {
    return database.create("appointment", appt);
  }

  delete(id) {
    return database.delete("appointment", id);
  }

  update(id, appt) {
    return database.set("appointment", id, appt);
  }
}

module.exports = new ApptsModel();