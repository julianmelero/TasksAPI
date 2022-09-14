const express = require('express');

const api = express.Router();

const HelloController = require("../controllers/hello");

api.get('/hello',HelloController.getHello);


module.exports = api;