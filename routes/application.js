const express = require('express');
const db = require('../models/db');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { createDB } = require('../models/db');

router.get('/', function(req, res) {
    res.render('application/index');
});
router.post('/application/new', function(req, res) {
    var erros = [];

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({ texto: 'Nome invalido' });
    }
    if (erros.length > 0) {
        res.render('admin/addcategorias', { erros: erros });
    } else {
         project =  Cliente.findOne({ where: { nameBD: req.body.bdName } });
            if (project === null) {
            console.log('Not found!');
            } else {
            console.log(project.nameBD); // 'My Title'
            }
    }

});

module.exports = router;