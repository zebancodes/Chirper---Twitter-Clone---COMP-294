const User = require("../models/userModel");
const Follower = require("../models/followerModel");
const Chirp = require("../models/chirpModel");

// getFeed function - Get the current users' feed
exports.getFeed = async (req, res) => {
  let userId = req.body.user_id;

  let followingUsers = await Follower.find({ user_id: userId })
    .lean()
    .exec()
    .then(function (followers) {
      return followers.map(function (follower) {
        return follower.user_id_following;
      });
    });

  let feed = [];

  // Get the current users own Chirps
  let currentUserChirps = await Chirp.find({ user_id: userId }).populate(
    "user_id"
  );

  // Get chirps from following users
  let chirpsFromFollowing = await Chirp.find({
    user_id: { $in: followingUsers },
  }).populate("user_id");

  feed = [...currentUserChirps, ...chirpsFromFollowing];

  res.status(200).json(feed);
};

// getFollowers function - Get the followers of the specified user
exports.getFollowers = async (req, res) => {
  let userId = req.params.user_id;
  let followers = await Follower.find({ user_id_following: userId }).populate(
    "user_id"
  );

  res.status(200).json(followers);
};

// getFollowing function - Get the users being followed by the specified user
exports.getFollowing = async (req, res) => {
  let userId = req.params.user_id;
  let following = await Follower.find({ user_id: userId }).populate(
    "user_id_following"
  );

  res.status(200).json(following);
};

// followUser function - Make the current user follow the specified user
exports.followUser = async (req, res) => {
  let user_following = await User.findOne({
    username: req.body.usernameToFollow,
  }).exec();

  let follower = new Follower({
    user_id: req.body.user_id,
    user_id_following: user_following._id,
  });

  follower.save((err, follower) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(follower);
  });
};

// unfollowUser function - Make the current user unfollow the specified user
exports.unfollowUser = async (req, res) => {
  let user_unfollowing = await User.findOne({
    username: req.body.usernameToUnfollow,
  }).exec();

  await Follower.deleteOne({
    user_id: req.body.user_id,
    user_id_following: user_unfollowing._id,
  }).exec();

  res.status(200).json(user_unfollowing);
};

// editProfile function - Save the current users profile with changes
exports.editProfile = async (req, res) => {
  let profile = req.body.profile;
  let user = await User.findOneAndUpdate({ _id: req.body.user_id }, profile);

  res.status(200).json(user);
};

// getProfile function - Get the profile of the specified user.
// Moved to bottom to fix params issue:
// https://stackoverflow.com/questions/67217031/express-endpoint-not-reflecting-changes-weird-behavior
exports.getProfile = async (req, res) => {
  //Done by Dani but I had to manually move in due to PR issue
  // Reworking slightly to add in user feed, follower and following count
  let username = req.params.username;
  let profile = await User.findOne({ username: username }).exec();

  // Check if user exists
  if (profile !== null) {
    // Check if the current signed in user is following the user whos profile they are trying to view
    let userRequesting = await User.findOne({ _id: req.body.user_id }).exec();

    let isFollowing = false;
    if (username !== userRequesting.fullname) {
      // OK, the signed in user is not requesting their own profile.
      isFollowing = await Follower.exists({
        user_id_following: profile._id,
        user_id: userRequesting._id,
      });
    }

    let chirps = await Chirp.find({ user_id: profile._id }).populate("user_id");

    let followingCount = await Follower.find({ user_id: profile._id }).count();
    let followerCount = await Follower.find({
      user_id_following: profile._id,
    }).count();

    res.status(200).json({
      feed: chirps,
      profile,
      followingCount,
      followerCount,
      isFollowing,
    });
  } else {
    res.status(404).json({ error: "User does not exist!" });
  }
};

exports.searchForUser = async (req, res) => {
  let search = req.params.search;

  // Search by every field that makes sense to search by (username, fullname, and email)
  const results = await User.find({
    $or: [
      { username: { $regex: search } },
      { fullname: { $regex: search } },
      { email: { $regex: search } },
    ],
  });

  res.status(200).json(results);
};
