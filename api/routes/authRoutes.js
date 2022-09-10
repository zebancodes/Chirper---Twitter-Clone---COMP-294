'use strict';

module.exports = function (app) {
    var auth = require('../controllers/authController');

    // Sign up
    app
        .route("/auth/signup")
        .post(auth.signUp)

    // Login
    app
        .route("/auth/login")
        .post(auth.login)

};