const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

const users =[];

app.get('/', (req, res, next) =>{
    res.render('add-user', {
        pageTitle: 'Add User'
    });
});

app.get('/users',(req, res, next) =>{
    res.render('display-users',{
        pageTitle: 'Display Users',
        users: users
    });
});

app.post('/add-user', (req, res, next) => {
    users.push({Name: req.body.addUser});
    res.redirect('/users');
});

app.listen(3000)