const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  multipleStatements: true,
  
});

module.exports = db;
