var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var request = require("supertest");
var app = require("../../server");
var mockData = require("../../mockData");
var mongoose = require("mongoose");
var db = require("../../mongoose");
function clearCollections(done) {
  for (var collection in mongoose.connection.collections) {
    mongoose.connection.collections[collection].deleteMany(function() {});
  }
  if (done) {
    return done();
  }
  return;
}

describe("WIDGET ROUTE TESTING", function() {
  before(function(done) {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(db, function(err) {
        if (err) throw err;
        return clearCollections(done);
      });
    } else {
      return clearCollections(done);
    }
  });

  after(function(done) {
    clearCollections();
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
