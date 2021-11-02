const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;

class CityService {

    async createCity(city) {
        return City.create(city);
    };

    async findCity(username, key) {
        return City.findByPk(username, key);
    };

    async findAllCitiesByUser(username) {
        return City.findAll({
            where:{
                username:username
            }
        });
    };

    async findAllCities() {
        return City.findAll();
    };

    async updateCity(username, key, city) {
        return City.update(city, {
            where: { username: username, key: key }
        }
        )
    };

    async deleteCity(username, key) {
        return City.destroy({
            where: { username: username, key: key }
        });
    };

}
module.exports = CityService;