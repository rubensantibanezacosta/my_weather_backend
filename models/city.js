module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        username: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'username',
            }
        },
        key: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        area: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },

    },
        { // Condiciones del objeto con relación a la tabla de los datos
            tableName: 'city',

        }
    );
    City.associate = function (models) {
        // associations can be defined here
        City.hasOne(models.users, {
            foreignKey: 'username',

        })
    };

    return City;
};