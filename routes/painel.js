const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('painel/index');
});










module.exports = router;