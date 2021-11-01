require('dotenv').config();
const config = {

  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',

    jwtSecret: process.env.JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',

    jwtSecret: process.env.JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',

    jwtSecret: process.env.JWT_SECRET,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
  }

}

module.exports = config ;