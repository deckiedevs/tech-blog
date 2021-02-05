const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets handlebars as template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on public folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
const routes = require('./controllers');
app.use(routes);

// turn on connection to db and server
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});