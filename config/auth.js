const localStrategy = require('passport-local');
const db = require('../models/db');
const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

//MODEL DE USUARIO





module.exports = function (passport){
    passport.use(new localStrategy({usernameField:'emailCliente'}, function (email, senha, done){
        Cliente.findOne({emailCliente: email}).then(function (cliente) {
            if(!cliente){
                return done(null, false, {message:'Essa conta nao existe'});
            }

            bcrypt.compare(senha, cliente.passwordCliente, function (erro,batem) {
                if(batem){
                    return done(null, user)
                }else{
                    return done(null, false, {message:'Senha incorreta'})
                }
            });
        })
    }))
    passport.serializeUser(function (cliente, done) {
        done(null,cliente.id)
    })

    passport.deserializeUser(function (id,done) {
        User.findById(id, function (err, cliente) {
            done(err,cliente)
        })
    })
}