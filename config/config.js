
module.exports = {
  "development": {
    "username": "iTDKzsmsnE",
    "password":"zu2Ehk6Flc",
    "database":  "iTDKzsmsnE",
    "host": "remotemysql.com",
    "post": "3306",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "lvpei",
    "password":"69791928",
    "database":  "lvpei",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.SQLDB_USERNAME,
    "password": process.env.SQLDB_PASSWORD,
    "database": process.env.SQLDB_DBNAME,
    "host": process.env.SQLDB_HOST,
    "port": process.env.SQLDB_PORT,
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
