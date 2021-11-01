module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    isAdmin: {
      type: Sequelize.BOOLEAN
    }
  },
    { // Condiciones del objeto con relación a la tabla de los datos
      tableName: 'users',
    }
  );

  return Users;
};