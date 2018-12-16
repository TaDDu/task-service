const express = require("express");
var app = express();
let routes = require("./routes.js");

app.use("/tasks", routes);

module.exports = app;
