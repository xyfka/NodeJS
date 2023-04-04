const bcrypt = require('bcryptjs');
const sendMail = require('@sendgrid/mail');
sendMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/user');


const msg = {
  to: 'strorinskijarg@gmail.com',
  from: 'lukasz.maz@gmail.com',
  subject: 'Konto utworzone!',
  html: '<h1>Twoje konto zostalo utworzone!</h1>',
};

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.')
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              return res.redirect('/');
            });

          }
          req.flash('error', 'Invalid email or password.')
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });

    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({
    email: email
  })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email alredy exists!')
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          sendMail.send(msg)
          .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
          })
          .catch(err => console.log(err));
        })
    })
    .catch(err => console.log(err));

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};