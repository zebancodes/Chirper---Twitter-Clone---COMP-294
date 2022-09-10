var expect = require("chai").expect;
const Chirp = require("../models/chirpModel");

describe("Chirp validation", function () {
  it("should be invalid if required fields are empty", function (done) {
    var chirp = new Chirp();

    chirp.validate(function (err) {
      expect(err.errors.user_id).to.exist;
      expect(err.errors.text).to.exist;
      done();
    });
  });
});
