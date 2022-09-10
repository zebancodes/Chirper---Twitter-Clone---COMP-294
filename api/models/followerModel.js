"use strict";
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const FollowerSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  user_id_following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// create and export model
module.exports = mongoose.model("followers", FollowerSchema);
