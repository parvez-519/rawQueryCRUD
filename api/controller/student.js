const db = require("../../db");
const appConst = require("../../api/constants");
const router = require("express").Router();

// CREATE DB
const createDB = async (req, res) => {
  try {
    //CREATE DB
    let createDB = `create database if not exists ${req.body.dbname}`;
    db.query(createDB, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    //USE DB
    let useDb = `use ${req.body.dbname}`;
    db.query(useDb, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
    // TABLE CREATION

    let createTableOne = `create table if not exists department(
      dept_id int primary key auto_increment,
      dept_name varchar(255)not null);
      
      create table if not exists student(
        s_id int primary key auto_increment,
        name varchar(255)not null,
        age tinyint(1) not null default 0,
        d_id int REFERENCES department(dept_id),constraint unique(d_id))`;

    db.query(createTableOne, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });

    res.status(200).json({
      status: appConst.status.success,
      response: null,
      message: "successfull",
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

// ADD ONE DATA
const add = async (req, res) => {
  try {
    let query = `INSERT INTO rawquery.department(dept_name) VALUES('${req.body.name}');
    INSERT INTO rawquery.student(name,age,d_id) VALUES('${req.body.name}',${req.body.age},LAST_INSERT_ID())`;
    console.log("----------> ", query.insertId);
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
    let deptValues = [];
    let studentValues = [];
    object.map((element) => {
      const dept = [(dept_name = element.dept_name)];
      const student = [(name = element.name), (age = element.age)];
      deptValues.push(dept);
      studentValues.push(student);
    });
    
    console.log();
    let query = `INSERT INTO rawquery.department(dept_name) VALUES ?;
    INSERT INTO rawquery.student(name,age,d_id) VALUES (?,?,LAST_INSERT_ID())`;

    db.query(
      query,
      [deptValues, studentValues],
      function (err, result, fields) {
        res.status(200).json({
          status: appConst.status.success,
          response: result,
          message: "successfull",
        });
      }
    );
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
    // let query = `SELECT * FROM rawquery.student WHERE id = ${req.params.id}`;
    let query = `SELECT * FROM rawquery.department as dept, rawquery.student as stud WHERE dept_id=${req.params.dept_id} AND d_id=${req.params.dept_id}`;
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
    // let query = `SELECT * FROM rawquery.department;
    let query = `SELECT * FROM rawquery.department JOIN rawquery.student ON dept_id = d_id`;
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
    // let query = `DELETE FROM rawquery.student WHERE id = ${req.params.id}`;
    let query = `DELETE rawquery.department, rawquery.student from rawquery.department 
    INNER JOIN rawquery.student ON department.dept_id=student.d_id where  student.d_id=${req.params.dept_id}`;
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

    let query = `DELETE FROM rawquery.department WHERE name='${req.body.name}'`;

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
    // let query = `UPDATE rawquery.department
    // SET name = '${req.body.name}', age = ${req.body.age}
    // WHERE id = ${req.body.id};`;
    let query = `UPDATE rawquery.department  INNER JOIN rawquery.student ON dept=${req.body.dept_id} and d_id=${req.body.dept_id} 
    SET student.name='${req.body.name}',student.age='${req.body.age}'`

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
  createDB,
  add,
  findOne,
  findAll,
  deleteOne,
  deleteMany,
  updateOne,
  addMany,
  updateMany,
};
