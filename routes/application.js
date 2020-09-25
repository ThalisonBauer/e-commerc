const express = require('express');
const db = require('../models/db');
const router = express.Router();
const Cliente = require('../models/Cliente');

console.log({Cliente.get})
/* 
const Categoria = require('../models/Categoria'); */

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
    Cliente.create({
        nameCliente: req.body.name,
        phoneCliente: req.body.phone,
        emailCliente: req.body.email,
        passwordCliente: req.body.password,
        nameBD: req.body.bdName

    }).then(function() {
        req.flash('success_msg', 'Cliente cadastrado com sucesso!');
        res.redirect('/');
    }).catch(function(erro) {
        req.flash('error_msg', 'Houve um erro ao salvar categoria, tenta novamente');
        res.redirect('/');
    });

    }

})













module.exports = router;