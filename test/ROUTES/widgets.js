const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../server");
const mockData = require("../../mockData");
const mongoose = require("mongoose");
const db = require("../../mongoose");
const Widget = require("../../models/Widget");

describe("WIDGET ROUTE TESTING", function() {
  before(async function() {
    await Widget.deleteMany({});
  });
  describe("GET /widgets", function() {
    it("should return all widgets", function(done) {
      request(app)
        .get("/widgets")
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an("array");
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
