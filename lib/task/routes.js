const express = require("express");
router = express.Router();
var controller = require("./controller.js");

router.get("/", controller.get.tasks);
router.post("/", controller.post.task);
router.put("/:id", controller.put.task);
router.delete("/:id", controller.delete.task);
module.exports = router;
