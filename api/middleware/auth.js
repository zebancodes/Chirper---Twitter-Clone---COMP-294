const User = require("../models/userModel");

module.exports = function (req, res, next) {
  const username = req.headers.authorization;

  User.findOne({ username: username }).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err); // This will be caught by error handler
      } else {
        req.body.user_id = user._id;
        return next(); // No error proceed to next middleware
      }
    }
  });
};
