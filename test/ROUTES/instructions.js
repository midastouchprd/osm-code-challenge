var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var request = require("supertest");
var app = require("../../server");

describe("GET /instructions", function() {
  it("should return instructions home", function(done) {
    request(app)
      .get("/instructions")
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.equal("This is the instructions resource");
        done();
      });
  });
});
