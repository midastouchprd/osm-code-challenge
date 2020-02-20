const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../server");
const mockData = require("../../mockData");
const mongoose = require("mongoose");
const db = require("../../mongoose");
const Instruction = require("../../models/Instruction");

describe("INSTRUCTION ROUTE TESTING", function() {
  before(async function() {
    await Instruction.deleteMany({});
  });

  describe("POST /instructions", function() {
    it("should create a instructions", function(done) {
      this.timeout(15000);
      request(app)
        .post("/instructions")
        .send(mockData.fakeInstructions.incomingSingle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.color).to.eql(
            mockData.fakeInstructions.incomingSingle.color
          );
          expect(res.body.data.criteria).to.eql(
            mockData.fakeInstructions.incomingSingle.criteria
          );
          expect(res.body.data.direction).to.eql(
            mockData.fakeInstructions.incomingSingle.direction
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

  describe("PUT /instructions/:id", function() {
    it("should update a instruction", function(done) {
      this.timeout(30000);
      // make a new instruction and save the id
      request(app)
        .post("/instructions")
        .send(mockData.fakeInstructions.incomingMultiple)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.color).to.eql(
            mockData.fakeInstructions.incomingMultiple.color
          );
          expect(res.body.data.criteria).to.eql(
            mockData.fakeInstructions.incomingMultiple.criteria
          );
          expect(res.body.data.direction).to.eql(
            mockData.fakeInstructions.incomingMultiple.direction
          );
          request(app)
            .put(`/instructions/${res.body.data._id}`)
            .send(mockData.fakeinstructions.outgoingSingle)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(201);
              expect(res.body.data.color).to.eql(
                mockData.fakeInstructions.outgoingSingle.color
              );
              expect(res.body.data.criteria).to.eql(
                mockData.fakeInstructions.outgoingSingle.criteria
              );
              expect(res.body.data.direction).to.eql(
                mockData.fakeInstructions.outgoingSingle.direction
              );
              done();
            });
        });
    });
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
});
