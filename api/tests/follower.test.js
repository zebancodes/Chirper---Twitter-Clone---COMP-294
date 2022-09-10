var expect = require("chai").expect;
const Follower = require("../models/followerModel");

describe("Follower validation", function () {
  it("should be invalid if required fields are empty", function (done) {
    var follower = new Follower();

    follower.validate(function (err) {
      expect(err.errors.user_id).to.exist;
      expect(err.errors.user_id_following).to.exist;
      done();
    });
  });
});
