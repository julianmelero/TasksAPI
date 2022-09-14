const express = require('express');

const app = express();

app.use(express.json());


// Load Routes

const hello_routes = require("./routes/hello");
const task_routes = require('./routes/task');
const user_routes = require('./routes/user');
// Base Routes

app.use("/api", hello_routes);
app.use("/api", task_routes);
app.use("/api", user_routes);

module.exports = app;