const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const rootData = require('./routes/root');
const userRout = require('./routes/users');



app.use(rootData.routes);
app.use(userRout);


app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found - 404' });
});

app.listen(3000, () => {
    console.log('Server is up @ 3000');
});