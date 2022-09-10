"use strict";

module.exports = function (app) {
  var user = require("../controllers/userController");

  // Get feed
  app.route("/feed").get(user.getFeed);

  // Get followers
  app.route("/followers/:user_id").get(user.getFollowers);

  // Get following
  app.route("/following/:user_id").get(user.getFollowing);

  // Edit profile
  app.route("/profile/save").post(user.editProfile);

  // Follow user
  app.route("/follow").post(user.followUser);

  // Unfollow user
  app.route("/unfollow").post(user.unfollowUser);

  // Get profile. Moved to bottom to fix weird params issue
  app.route("/:username").get(user.getProfile);

  // Search for users
  app.route("/search/:search").get(user.searchForUser);
};
