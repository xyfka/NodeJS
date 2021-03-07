const express = require('express');
const path = require('path');
const rootDir = require("./util/path")

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');



app.use(indexRoutes);
app.use(usersRoutes);



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404page.html'));
});

app.listen(3000, () => {
    console.log("Server stoi na porcie 3000");
})