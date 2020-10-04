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
            result = Cliente.findOne({
                where: {nameBD: req.body.bdName}

            }).then(result => {
                if(result.nameBD === req.body.bdName){
                    req.flash('error_msg', 'Loja ja existe');
                    res.redirect('/');
                }else{
                    req.flash('error_msg', 'Houve um erro ao criar sua Loja, tenta novamente');
                    res.redirect('/');
                }
            }).catch(result =>{
                Cliente.create({
                    nameCliente: req.body.name,
                    phoneCliente: req.body.phone,
                    emailCliente: req.body.email,
                    passwordCliente: req.body.password,
                    nameBD: req.body.bdName
            
                }).then(function() {
                    createDB(req.body.bdName);
                    req.flash('success_msg', 'Loja criada com sucesso!');
                    res.redirect('/');
                }).catch(function(erro) {
                    req.flash('error_msg', 'Houve um erro ao criar sua Loja, tenta novamente');
                    res.redirect('/');
                });
            });
        }

});

module.exports = router;