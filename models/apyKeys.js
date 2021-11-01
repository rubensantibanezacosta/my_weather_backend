module.exports = (sequelize, Sequelize) => {
    const ApiKey = sequelize.define("apiKey", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        token: {
            type: Sequelize.STRING,
            
        },
        scopes: {
            type: Sequelize.STRING
        },

    },
        { // Condiciones del objeto con relación a la tabla de los datos
            tableName: 'apiKeys',

        }
    );

    return ApiKey;
};