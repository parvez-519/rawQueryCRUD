const db = require("../../db");
const appConst = require("../../api/constants");
const router = require("express").Router();

// ADD ONE DATA
const add = async (req, res) => {
  try {
    let query = `INSERT INTO rawquery.student(name,age) VALUES('${req.body.name}',${req.body.age})`;
    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: result,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// ADD MANY

const addMany = async (req, res) => {
  try {
    console.log("---", req.body);
    let object = req.body;
    let values = [];
    object.map((element) => {
      const item = [(name = element.name), (age = element.age)];

      values.push(item);
    });

    console.log(values);
    // for(let i=0;i<object.length;i++)
    // {

    //   console.log("---->",obj)
    //   values.push(object[i].name+" , "+object[i].age)
    //   values.push(object[i])
    //  values.push(object[i].age)
    //    values.push(obj)

    //   console.log(values)
    // }
    let query = `INSERT INTO rawquery.student(name,age) VALUES ?`;
    db.query(query, [values], function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: result,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// FIND ONE
const findOne = async (req, res) => {
  try {
    let query = `SELECT * FROM rawquery.student WHERE id = ${req.params.id}`;

    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: result,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// FIND ALL
const findAll = async (req, res) => {
  try {
    let query = `SELECT * FROM rawquery.student`;
    // let data = db.query(query);
    // let resp=JSON.parse(data)
    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: result,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// DELETE ONE
const deleteOne = async (req, res) => {
  try {
    let query = `DELETE FROM rawquery.student WHERE id = ${req.params.id}`;

    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: null,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// DELETE MANY
const deleteMany = async (req, res) => {
  try {
    console.log("--------", req.body);

    let query = `DELETE FROM rawquery.student WHERE name='${req.body.name}'`;

    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: null,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// UPDATE ONE
const updateOne = async (req, res) => {
  try {
    let query = `UPDATE Customers
    SET name = '${req.body.name}', age = ${req.body.age}
    WHERE id = ${req.body.id};`;

    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: null,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

// UPDATE MANY
const updateMany = async (req, res) => {
  try {
    const object = req.body;
    const values = [];
    object.map((element) => {
      const item = [(name = element.name), (age = element.age)];
      values.push(item);
    });

    values.forEach((element) => {
      let query = `UPDATE Customers
    SET name = '${element[1]}', age = ${element[2]}
    WHERE id = ${element[0]};`;
    });

    db.query(query, function (err, result, fields) {
      res.status(200).json({
        status: appConst.status.success,
        response: null,
        message: "successfull",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: err.message,
    });
  }
};

module.exports = {
  add,
  findOne,
  findAll,
  deleteOne,
  deleteMany,
  updateOne,
  addMany,
  updateMany,
};
