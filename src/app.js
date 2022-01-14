const express = require('express');
const path = require('path')
const app = express();
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
// BCRYP COMO SE USABA ? asi ?? en mainController.js dentro de processLogin dice que no esta definido bcrypt.
// instale los npm i bcrypt y bcryptjs pero con eso solo no basta ! 
const bcrypt = require('bcrypt')
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({ secret: 'Secreto', resave: false, saveUninitialized: false }));
app.use(userLoggedMiddleware);
app.use(cookies());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); 

app.use('/', mainRouter);
app.use('/products', productsRouter);



app.listen(process.env.PORT || 3001, function(){
    console.log('Servidor funcionando en el 3001');
});