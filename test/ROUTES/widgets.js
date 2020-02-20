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

  describe("POST /widgets", function() {
    it("should create a widget", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send(mockData.fakeWidgets.downRedCircle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.color).to.eql(
            mockData.fakeWidgets.downRedCircle.color
          );
          expect(res.body.data.qualities).to.eql(
            mockData.fakeWidgets.downRedCircle.qualities
          );
          expect(res.body.data.shape).to.eql(
            mockData.fakeWidgets.downRedCircle.shape
          );
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
  describe("PUT /widgets/:id", function() {
    it("should update a widget", function(done) {
      this.timeout(30000);
      // make a new widget and save the id
      request(app)
        .post("/widgets")
        .send(mockData.fakeWidgets.strangeBottomYellowSquare)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.color).to.eql(
            mockData.fakeWidgets.strangeBottomYellowSquare.color
          );
          expect(res.body.data.qualities).to.eql(
            mockData.fakeWidgets.strangeBottomYellowSquare.qualities
          );
          expect(res.body.data.shape).to.eql(
            mockData.fakeWidgets.strangeBottomYellowSquare.shape
          );
          request(app)
            .put(`/widgets/${res.body.data._id}`)
            .send(mockData.fakeWidgets.upPinkTriangle)
            .end(function(err, res2) {
              expect(res2.statusCode).to.equal(201);
              expect(res2.body.data.color).to.eql(
                mockData.fakeWidgets.upPinkTriangle.color
              );
              expect(res2.body.data.qualities).to.eql(
                mockData.fakeWidgets.upPinkTriangle.qualities
              );
              expect(res2.body.data.shape).to.eql(
                mockData.fakeWidgets.upPinkTriangle.shape
              );
              done();
            });
        });
    });
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
});
