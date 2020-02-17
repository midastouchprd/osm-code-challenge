var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var request = require("supertest");
var app = require("../../server");

describe("GET /widgets", function() {
  it("should return widgets home", function(done) {
    request(app)
      .get("/widgets")
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.equal("This is the widgets resource");
        done();
      });
  });
});
