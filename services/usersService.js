const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const imageToBase64 = require('image-to-base64');


class UserService {

  async createUser(user) {
    
    const avatar=await imageToBase64(__dirname+"/../assets/images/avatar.jpeg");
    
    const userToPersist = {
      password: (bcrypt.hashSync(user.password, 10)),
      name: user.name,
      username: user.username,
      isAdmin: false,
      //image: avatar
      
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
      isAdmin: body.isAdmin,
      image: btoa(body.image)
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