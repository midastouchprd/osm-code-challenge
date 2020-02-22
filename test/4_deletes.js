const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../server");
const mockData = require("../mockData");
const Instruction = require("../models/Instruction");
const Widget = require("../models/Widget");

const {
  fakeWidgets: { deleteWidget },
  fakeInstructions: { deleteInstruction }
} = mockData;
describe.only("DELETE TESTING", function() {
  before(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });
  after(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });
  describe("DELETE /widgets/:id", function() {
    it("should delete a widget", function(done) {
      this.timeout(30000);
      request(app)
        .post("/widgets")
        .send(deleteWidget)
        .end(function(err, makeWidgetResponse) {
          expect(makeWidgetResponse.statusCode).to.equal(201);
          expect(makeWidgetResponse.body.data[0].color).to.eql(
            deleteWidget.color
          );
          expect(makeWidgetResponse.body.data[0].qualities).to.eql(
            deleteWidget.qualities
          );
          expect(makeWidgetResponse.body.data[0].shape).to.eql(
            deleteWidget.shape
          );
          request(app)
            .delete(`/widgets/${makeWidgetResponse.body.data[0]._id}`)
            .end(function(err, deleteWidgetResponse) {
              request(app)
                .get("/widgets")
                .end(function(err, getWidgetResponse) {
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(0);
                  done();
                });
            });
        });
    });
  });
  describe("DELETE /instructions/:id", function() {
    it("should delete a instruction", function(done) {
      this.timeout(30000);
      request(app)
        .post("/instructions")
        .send(deleteInstruction)
        .end(function(err, makeInstructionsResponse) {
          expect(makeInstructionsResponse.statusCode).to.equal(201);
          expect(makeInstructionsResponse.body.data[0].color).to.eql(
            deleteInstruction.color
          );
          expect(makeInstructionsResponse.body.data[0].criteria).to.eql(
            deleteInstruction.criteria
          );
          expect(makeInstructionsResponse.body.data[0].direction).to.eql(
            deleteInstruction.direction
          );
          request(app)
            .delete(
              `/instructions/${makeInstructionsResponse.body.data[0]._id}`
            )
            .end(function(err, deleteInstructionResponse) {
              request(app)
                .get("/instructions")
                .end(function(err, getWidgetResponse) {
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(0);
                  done();
                });
            });
        });
    });
  });
});
