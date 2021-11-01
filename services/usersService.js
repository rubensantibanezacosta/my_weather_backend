const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const users = require("../models/users");

class UserService {

  async createUser(user) {

    const userToPersist = {
      password: (bcrypt.hashSync(user.password, 10)),
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin
    };

    return Users.create(userToPersist);
  }

  async findAll() {
    return Users.findAll();
  }

  async findOne(username) {
    return Users.findAll({
      where: { username: username }
    });
  }

  async update(body, username) {
    const userToPersist = {
      password: (bcrypt.hashSync(body.password, 10)),
      name: body.name,
      username: body.username,
      isAdmin: body.isAdmin
    };

    return Users.update(userToPersist, {
      where: { username: username }
    })
  }

  async deleteOne(username) {
    return Users.destroy({
      where: { username: username }
    })
  }
}

module.exports = UserService;