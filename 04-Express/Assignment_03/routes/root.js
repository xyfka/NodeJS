const express = require('express');

const router = express.Router();

const users = [];

router.get('/add-user', (req, res, next) => {
    res.render('root', {
        pageTitle: 'Add User'
    });
});

router.post('/add-user', (req, res, next) => {
    users.push({ userName: req.body.userName });
    res.redirect('/');
});

exports.routes = router;
exports.users = users;