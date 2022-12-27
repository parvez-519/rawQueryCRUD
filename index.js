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
