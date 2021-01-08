var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require('./Root/db');
const router = express.Router();



app.use("/", router);
app.use("/users", require("./Routes/user_route"));



app.listen(8000);
console.log("Listening to PORT 8000");