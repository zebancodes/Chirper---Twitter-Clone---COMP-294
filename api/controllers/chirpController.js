const Chirp = require("../models/chirpModel");

// createChirp function - Create a new Chirp for the current user
exports.createChirp = (req, res) => {
  let chirp = new Chirp(req.body);
  chirp.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};

// getChirp function - Get a Chirp based on the passed in Chirp ID
exports.getChirp = (req, res) => {
  Chirp.findById(req.params.id, (err, chirp) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(chirp);
  });
};

// editChirp function - Edit the Chirp based on the passed in Chirp ID and info (current user only)
exports.editChirp = (req, res) => {
  const chirpId = req.body.id;
  const chirpText = req.body.text;

  Chirp.findByIdAndUpdate(chirpId, { text: chirpText }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

// deleteChirp function - Delete the specified Chirp based on the passed in Chirp ID
exports.deleteChirp = (req, res) => {
  Chirp.findByIdAndDelete(req.params.id, (err, chirp) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(chirp);
  });
};
