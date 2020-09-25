const express = require('express');
const router = express.Router();
/* const Cliente = require('../models/Cliente');

const Categoria = require('../models/Categoria'); */

router.get('/', function(req, res) {
    res.render('painel/index');
});










module.exports = router;