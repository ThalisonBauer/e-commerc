const express = require('express');
const db = require('../models/db');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { get } = require('http');

router.get('/', function(req, res) {
    res.render('ecommerc/index');
    console.log() 
});







module.exports = router;