var expect = require("chai").expect;
const User = require("../models/userModel");

describe("User validation", function () {
  it("should be invalid if required fields are empty", function (done) {
    var user = new User();

    user.validate(function (err) {
      expect(err.errors.fullname).to.exist;
      expect(err.errors.username).to.exist;
      expect(err.errors.email).to.exist;
      expect(err.errors.password).to.exist;
      expect(err.errors.biography).to.exist;
      done();
    });
  });
});
