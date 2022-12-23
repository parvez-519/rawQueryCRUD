const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "rawquery",
  multipleStatements: true,
  
});

// connect to the MySQL server
// db.connect(function (err) {
//   if (err) {
//     console.error("error: " + err.message);
//   }

//   let createTable = `create table if not exists student(
//                             id int primary key auto_increment,
//                             name varchar(255)not null,
//                             age tinyint(1) not null default 0
//                         )`;

//   db.query(createTable, function (err, results, fields) {
//     if (err) {
//       console.log(err.message);
//     }
//   });
// });

module.exports = db;
