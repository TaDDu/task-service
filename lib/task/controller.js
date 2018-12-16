var exports = (module.exports = {});
const _ = require("lodash");
const { Task } = require("../sequelize.js");

exports.get = {
  tasks: (req, res) => {
    var data = _.pick(req.user, ["userId"]);
    Task.findAll({ where: { userId: data.userId } }).then(tasks => {
      res.json(tasks);
    });
  }
};

exports.post = {
  task: (req, res) => {
    var data = _.pick(req.user, ["userId"]);
    var body = _.pick(req.body, ["title", "description"]);
    if (
      body.title == null ||
      body.title == undefined ||
      body.title.length < 1
    ) {
      res
        .status(400)
        .json({ error: true, message: "task title is required", data: body });
    } else {
      Task.build({
        title: body.title,
        description: body.description,
        userId: data.userId
      })
        .save()
        .then(task => {
          res.status(201).json(task);
        });
    }
  }
};

exports.put = {
  task: (req, res) => {
    var data = _.pick(req.user, ["userId"]);
    var task = _.pick(req.params, ["id"]);
    var body = _.pick(req.body, ["title", "description", "closed"]);
    Task.findOne({ where: { id: task.id, userId: data.userId } }).then(task => {
      if (task == null) {
        res.status(404).json({ error: true, message: "task not found" });
      } else {
        task.update(body).then(newTask => {
          res.status(201).json(newTask);
        });
      }
    });
  }
};

exports.delete = {
  task: (req, res) => {
    var data = _.pick(req.user, ["userId"]);
    var task = _.pick(req.params, ["id"]);
    Task.destroy({ where: { id: task.id, userId: data.userId } }).then(
      function(rowDeleted) {
        // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
          res
            .status(200)
            .json({ error: false, message: "Data succesfully deleted" });
        }
      },
      function(err) {
        res
          .status(500)
          .json({ error: true, message: "Error while deleting task" });
      }
    );
  }
};
