const db = require("../models");
const ApiKeys = db.apiKey;
const Op = db.Sequelize.Op;

class ApiKeysService {

    findOne(token) {
        return ApiKeys.findAll({
            where: {
                token: token
            }
        });
    }
}

module.exports = ApiKeysService;

