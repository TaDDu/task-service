const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const eStatics = require("e-statics")(app);
require("dotenv").config();
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(eStatics.counter);
app.use("/api", require("./lib"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started at port: %i", PORT);
});
