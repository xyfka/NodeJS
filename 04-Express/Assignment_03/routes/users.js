const express = require('express');

const router = express.Router();
const userData = require('./root');


router.get('/', (req, res, next) => {
    const users = userData.users;
    res.render('users', {
        pageTitle: 'User List',
        users: users
    });
});

module.exports = router;