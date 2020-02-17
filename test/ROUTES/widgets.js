var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var request = require("supertest");
var app = require("../../server");
var mockData = require("../../mockData");
var mongoose = require("mongoose");
var db = require("../../mongoose");

describe("WIDGET ROUTE TESTING", function() {
  before(function(done) {
    function clearCollections() {
      for (var collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(function() {});
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(db, function(err) {
        if (err) throw err;
        return clearCollections();
      });
    } else {
      return clearCollections();
    }
  });

  after(function(done) {
    mongoose.disconnect();
    return done();
  });
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
    it("should create a widget", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send(mockData.fakeWidgets.downRedCircle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.eql(mockData.fakeWidgets.downRedCircle);
          done();
        });
    });
    it("shouldn't create a widget if its already in there", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send(mockData.fakeWidgets.downRedCircle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });
});
