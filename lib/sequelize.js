const Sequelize = require("sequelize");

const TaskModel = require("../models/task");

const conn = new Sequelize(
  process.env.DB_NAME || config.DB_NAME,
  process.env.DB_USER || config.DB_USER,
  process.env.DB_PASSWORD || config.DB_PASSWORD,
  {
    host: process.env.DB_HOST || config.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const Task = TaskModel(conn, Sequelize);

conn.sync({ force: process.env.FORCE || false }).then(() => {});

module.exports = {
  Task
};
