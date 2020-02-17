const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../server");
const mockData = require("../../mockData");
const mongoose = require("mongoose");
const db = require("../../mongoose");
const Instruction = require("../../models/Widget");

describe("INSTRUCTION ROUTE TESTING", function() {
  before(async function() {
    await Instruction.deleteMany({});
  });
  describe("GET /instructions", function() {
    it("should return all instructions", function(done) {
      request(app)
        .get("/instructions")
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /instructions", function() {
    it("should create a instructions", function(done) {
      this.timeout(15000);
      request(app)
        .post("/instructions")
        .send(mockData.fakeInstructions.incomingSingle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data).to.eql(
            mockData.fakeInstructions.incomingSingle
          );
          done();
        });
    });
    it("shouldn't create a instruction if its already in there", function(done) {
      this.timeout(15000);
      request(app)
        .post("/instructions")
        .send(mockData.fakeInstructions.incomingSingle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });
});
