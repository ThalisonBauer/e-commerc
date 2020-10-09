const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const appl = require('./routes/application');
const painel = require('./routes/painel');
const ecommerc = require('./routes/ecommerc')
const Cliente = require('./models/Cliente');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport)

//------------config
//--sessão
app.use(session({
    secret: "Admp5pexvm",
    resave:true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//--Middleware
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//--Handelebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//--Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//--Public
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname + 'public')));

//------------Rotas
app.use('/', appl);
app.use('/painel', painel);

result = Cliente.findAll({
    attributes: ['nameBD']

}).then(function(result){
    var name = "cu";
    result = JSON.stringify(result)
    console.log(result)
    
    app.use('/'+name+'', ecommerc);
}).catch(result =>{});

app.listen(8081, function() {
    console.log('Servidor rodando na url 8081');
});