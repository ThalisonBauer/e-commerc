const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

router.get('/', function(req, res) {
    res.render('admin/index');
});
router.get('/produtos', function(req, res) {
    res.send('Pagine add produtos');
})

//CRUD CATEGORIA

router.get('/categorias', function(req, res) {
    Categoria.findAll().then(function(categorias) {
        res.render('admin/categorias', { categorias: categorias });
    }).catch(function(erro) {
        req.flash('error_msg', 'Houve um erro ao listar as categorias');
        req.redirect('/admin');
    })
});
router.get('/categorias/add', function(req, res) {
    res.render('admin/addcategorias');
});
router.post('/categorias/new', function(req, res) {

    var erros = [];

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({ texto: 'Nome invalido' });
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'Slug invalido' });
    }
    if (req.body.name.length < 2) {
        erros.push({ texto: 'Nome da categoria é muito pequeno' });
    }
    if (erros.length > 0) {
        res.render('admin/addcategorias', { erros: erros });
    } else {
        Categoria.create({
            nameCategoria: req.body.name,
            slugCategoria: req.body.slug
        }).then(function() {
            req.flash('success_msg', 'Categoria criada com sucesso!');
            res.redirect('/admin/categorias');
        }).catch(function(erro) {
            req.flash('error_msg', 'Houve um erro ao salvar categoria, tenta novamente');
            res.redirect('/admin');
        });
    }


})
router.get('/categorias/edit/:id', function(req, res) {

    Categoria.findOne({ where: { id: req.params.id } }).then(function(categoria) {
        res.render('admin/editcategorias', { categoria: categoria });
    }).catch(function(erro) {
        //NAO ESTA FUNCIONANDO
        req.flash('error_msg', 'Esta categoria não existe');
        res.redirect('/admin/categorias');
    });
});

/* router.post('/categorias/edit', function(req, res) {

            Categoria.findOne({ id: req.body.id }).then(function(categoria) {
                categoria.nameCategoria = req.body.name
                categoria.slugCategoria = req.body.slug

                Categoria.create({ id: req.body.id }).then(function() {
                    categoria.save().then(function() {
                        req.flash('success_msg', 'Categoria editada com sucesso');
                        res.redirect('/admin/categorias');
                    }).catch(function(erro) {
                        req.flash('error_msg', 'Houve um erro interno ao salvar');
                        res.redirect('/admin/categorias');
                    })
                }).catch(function(error) {
                    req.flash('error_msg', 'Erro ao editar a categoria');
                    res.redirect('/admin/categorias');
                });


            });
 */

module.exports = router;