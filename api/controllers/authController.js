const User = require("../models/userModel");

// signUp function - Create a new user account with the specified data
exports.signUp = async (req, res) => {
  if (await User.exists({ username: req.body.username })) {
    res.status(422).json({ error: "User already exists!" });
  } else {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json(user);
    });
  }
};

// login function - Login the specified user with username and password
exports.login = async (req, res) => {
  if (await User.exists({ username: req.body.username })) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(user);
    });
  } else {
    res.status(422).json({ error: "Username not found!" });
  }
};
