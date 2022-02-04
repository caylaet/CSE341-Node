const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const PORT = process.env.PORT || 3000; // So we can run on heroku || (OR) localhost:5000

const cors = require('cors') // Place this with other requires (like 'path' and 'express')


const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://nodeJSTalk:f7KvKR6YKygZhik@cluster0.copz7.mongodb.net/shop?retryWrites=true&w=majority";


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

const csrfProctection = csrf();

const corsOptions = {
  origin: "https://cse341-caylatribett-node.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  family: 4
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret', resave: false, saveUninitialized: false, store: store}));
app.use(csrfProctection);
app.use(flash());

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken();
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URL, options)
.then( result => {
  app.listen(PORT);

})
.catch( err => {
  console.log(err);
})