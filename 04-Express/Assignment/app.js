const express = require('express');

const app = express();

// app.use((req, res,next) => {
//     console.log('Hello from New Script!');
//     next();
// });

// app.use((req, rew, next) => {
//     console.log('To jest drugi middleware!');
// });

app.use('/users', (req, res, next) => {
    res.send('<h1>To jest strona Users!</h2>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>To jest strona glowna!');
});

app.listen(3000);