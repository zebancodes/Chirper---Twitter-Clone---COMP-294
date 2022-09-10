'use strict';

module.exports = function (app) {
    var chirp = require('../controllers/chirpController');

    // Create Chirp
    app
        .route("/chirp")
        .post(chirp.createChirp)

    // Get Chirp
    app
        .route("/chirp/:id")
        .get(chirp.getChirp)

    // Edit Chirp
    app
        .route("/chirp/edit")
        .post(chirp.editChirp)

    // Delete Chirp
    app
        .route("/chirp/:id")
        .post(chirp.deleteChirp)

};
