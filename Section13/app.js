const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:5000

const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const corsOptions = {
  origin: "https://cse341-caylatribett-node.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://nodeJSTalk:f7KvKR6YKygZhik@cluster0.copz7.mongodb.net/shop?retryWrites=true&w=majority";


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f1ee831afb9f1cb5b49202')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URL, options)
.then( result => {
  User.findOne().then( user1 => {
    if(!user1){
      const user = new User({
        name: 'Max',
        email: 'max@test.com',
        cart: {
          items: []
        }
    });
    user.save();
    }
  });
  app.listen(PORT);

})
.catch( err => {
  console.log(err);
})