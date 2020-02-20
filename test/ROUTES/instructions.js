const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../server");
const mockData = require("../../mockData");
const mongoose = require("mongoose");
const db = require("../../mongoose");
const Instruction = require("../../models/Instruction");

const {
  fakeInstructions: {
    incomingMultiple,
    incomingSingleDUP,
    incomingSingle,
    outgoingSingle,
    outgoingMultiple,
    outgoingMultiple2
  }
} = mockData;

describe("INSTRUCTION ROUTE TESTING", function() {
  before(async function() {
    await Instruction.deleteMany({});
  });

  describe("POST /instructions", function() {
    it("should create a instructions", function(done) {
      this.timeout(30000);
      request(app)
        .post("/instructions")
        .send(incomingSingle)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.ops[0].color).to.eql(incomingSingle.color);
          expect(res.body.data.ops[0].criteria).to.eql(incomingSingle.criteria);
          expect(res.body.data.ops[0].direction).to.eql(
            incomingSingle.direction
          );
          done();
        });
    });
    it("should overwrite instruction if its there", function(done) {
      this.timeout(30000);
      request(app)
        .post("/instructions")
        .send(incomingSingleDUP)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.color).to.eql(incomingSingleDUP.color);
          expect(res.body.data.criteria).to.eql(incomingSingleDUP.criteria);
          expect(res.body.data.direction).to.eql(incomingSingleDUP.direction);
          request(app)
            .get("/instructions")
            .end((err, res2) => {
              expect(res2.statusCode).to.equal(200);
              expect(res2.body.data).to.be.an("array");
              expect(res2.body.data.length).to.equal(1);
            });
          done();
        });
    });

    it("should create multiple instructions", function(done) {
      this.timeout(30000);
      request(app)
        .post("/instructions")
        .send([outgoingMultiple, outgoingMultiple2])
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.ops).to.be.an("array");
          expect(res.body.data.ops.length).to.equal(2);
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
        .send(incomingMultiple)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.data.ops[0].color).to.eql(incomingMultiple.color);
          expect(res.body.data.ops[0].criteria).to.eql(
            incomingMultiple.criteria
          );
          expect(res.body.data.ops[0].direction).to.eql(
            incomingMultiple.direction
          );
          request(app)
            .put(`/instructions/${res.body.data.ops[0]._id}`)
            .send(outgoingSingle)
            .end(function(err, res2) {
              expect(res2.statusCode).to.equal(201);
              expect(res2.body.data.color).to.eql(outgoingSingle.color);
              expect(res2.body.data.criteria).to.eql(outgoingSingle.criteria);
              expect(res2.body.data.direction).to.eql(outgoingSingle.direction);
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
