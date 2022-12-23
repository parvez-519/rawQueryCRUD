const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const router = require("./api/router");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
require("dotenv").config();
const db = require("./db");
async function init() {
  try {
    await db.connect(function (err) {
      if (err) {
        console.error("error: " + err.message);
      }

      let createTable = `create table if not exists student(
                                  id int primary key auto_increment,
                                  name varchar(255)not null,
                                  age tinyint(1) not null default 0
                              )`;

      db.query(createTable, function (err, results, fields) {
        if (err) {
          console.log(err.message);
        }
      });
    });
    console.log("DB initialized.");
    app.use("/", router);
    app.listen(process.env.PORT, () => {
      console.log(`Now listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
init();
