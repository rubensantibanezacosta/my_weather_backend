module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        cp: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },

    },
        { // Condiciones del objeto con relación a la tabla de los datos
            tableName: 'city',

        }
    );

    return City;
};