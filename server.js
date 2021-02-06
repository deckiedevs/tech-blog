const express = require('express');
const app = express();
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creates session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {}, 
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// uses public folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// sets handlebars as template engine
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
const routes =  require('./controllers');
app.use(routes)

// turn on connection to db and server 
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});