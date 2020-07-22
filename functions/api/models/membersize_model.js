const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class MembersModel {
  constructor() {
    if (this.instance) return this.instance;
    MembersModel.instance = this;
  }

  get() {
    return database.getList("members");
  }

  getById(id) {
    return database.get("members", id);
  }

  create(member) {
    return database.create("members", member);
  }

  delete(id) {
    return database.delete("members", id);
  }

  update(id, member) {
    return database.set("members", id, member);
  }
}

module.exports = new MembersModel();