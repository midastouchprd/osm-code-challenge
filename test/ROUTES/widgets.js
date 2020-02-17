var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var request = require("supertest");
var app = require("../../server");
var mockData = require("../../mockData");
console.log(mockData);

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

describe("POST /widgets", function() {
  it("should return create a widget", function(done) {
    request(app)
      .post("/widgets", mockData.fakeWidgets.downRedCircle)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.equal(mockData.fakeWidgets.downRedCircle);
        done();
      });
  });
});
