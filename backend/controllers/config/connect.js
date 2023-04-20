const mySQL = require("mysql2");

module.exports = mySQL.createConnection({
   host: "localhost",
   user: "root",
   password: "12345678",
   database: "social",
});
