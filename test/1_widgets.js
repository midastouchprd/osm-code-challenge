const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../server");
const mockData = require("../mockData");
const Instruction = require("../models/Instruction");
const Widget = require("../models/Widget");

const {
  fakeWidgets: {
    downPinkTriangle,
    downRedCircle,
    upPinkTriangle,
    strangeBottomYellowSquare,
    deleteWidget
  }
} = mockData;

describe("WIDGET ROUTE TESTING", function() {
  before(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });
  after(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });

  describe("POST /widgets", function() {
    it("should create a widget", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send(downRedCircle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data[0].color).to.eql(downRedCircle.color);
          expect(res.body.data[0].qualities).to.eql(downRedCircle.qualities);
          expect(res.body.data[0].shape).to.eql(downRedCircle.shape);
          done();
        });
    });
    it("shouldn't create a widget if its already in there", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send(downRedCircle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it("should create multiple widgets", function(done) {
      this.timeout(15000);
      request(app)
        .post("/widgets")
        .send([downPinkTriangle, upPinkTriangle])
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.be.an("array");
          expect(res.body.data.length).to.equal(2);
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
        .send(strangeBottomYellowSquare)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data[0].color).to.eql(
            strangeBottomYellowSquare.color
          );
          expect(res.body.data[0].qualities).to.eql(
            strangeBottomYellowSquare.qualities
          );
          expect(res.body.data[0].shape).to.eql(
            strangeBottomYellowSquare.shape
          );
          request(app)
            .put(`/widgets/${res.body.data[0]._id}`)
            .send(upPinkTriangle)
            .end(function(err, res2) {
              expect(res2.statusCode).to.equal(201);
              expect(res2.body.data.color).to.eql(upPinkTriangle.color);
              expect(res2.body.data.qualities).to.eql(upPinkTriangle.qualities);
              expect(res2.body.data.shape).to.eql(upPinkTriangle.shape);
              done();
            });
        });
    });
  });
  describe("DELETE /widgets/:id", function() {
    it("should delete a widget", function(done) {
      this.timeout(30000);
      // make a new widget and save the id
      request(app)
        .post("/widgets")
        .send(deleteWidget)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data[0].color).to.eql(deleteWidget.color);
          expect(res.body.data[0].qualities).to.eql(deleteWidget.qualities);
          expect(res.body.data[0].shape).to.eql(deleteWidget.shape);
          request(app)
            .delete(`/widgets/${res.body.data[0]._id}`)
            .end(function(err, res2) {
              expect(res2.statusCode).to.equal(201);
              expect(res2.body.data.color).to.eql(upPinkTriangle.color);
              expect(res2.body.data.qualities).to.eql(upPinkTriangle.qualities);
              expect(res2.body.data.shape).to.eql(upPinkTriangle.shape);
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
