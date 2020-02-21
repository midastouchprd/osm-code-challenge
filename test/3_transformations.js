const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../server");
const mockData = require("../mockData");
const Instruction = require("../models/Instruction");
const Widget = require("../models/Widget");

const {
  fakeTransformationTestInstructions: {
    incomingCircleDownYellow,
    incomingTriangleUpOrange,
    incomingTriangleDownOrange,
    outgoingSquareStrangeBottomGreen
  },
  fakeWidgets: {
    downPinkTriangle,
    downRedCircle,
    upPinkTriangle,
    strangeBottomYellowSquare
  }
} = mockData;

describe.only("WIDGET TRANSFORMATION TESTS", function() {
  before(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });
  after(async function() {
    await Instruction.deleteMany({});
    await Widget.deleteMany({});
  });

  describe("Incoming Instructions", function() {
    it("should update widgets in the database based on color of instruction", function(done) {
      this.timeout(5000);
      request(app)
        .post("/widgets")
        .send(downRedCircle)
        .end(function(err, makeWidgetResponse) {
          console.log("===============makeWidgetResponse=====================");
          console.log(makeWidgetResponse.body);
          console.log("====================================");
          request(app)
            .post("/instructions")
            .send(incomingCircleDownYellow)
            .end(function(err, makeInstructionResponse) {
              //expect the response to have the transformation
              expect(makeInstructionResponse.statusCode).to.equal(201);
              expect(
                makeInstructionResponse.body.transformations[0].before.color
              ).to.eql(downRedCircle.color);
              expect(
                makeInstructionResponse.body.transformations[0].after.color
              ).to.eql(incomingCircleDownYellow.color);

              request(app)
                .get("/widgets")
                .end(function(err, getWidgetResponse) {
                  //there should only be one widget that now has the color yellow
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(1);
                  expect(getWidgetResponse.body.data[0].color).to.eql(
                    incomingCircleDownYellow.color
                  );
                  done();
                });
            });
        });
    });
    it("should work with multiples", function(done) {
      this.timeout(5000);
      request(app)
        .post("/widgets")
        .send(strangeBottomYellowSquare)
        .end(function(err, makeWidgetResponse) {
          request(app)
            .post("/instructions")
            .send([incomingTriangleDownOrange, incomingTriangleUpOrange])
            .end(function(err, makeInstructionResponse) {
              console.log(
                "================makeInstructionResponse===================="
              );
              console.log(makeInstructionResponse.body);
              console.log("====================================");
              expect(makeInstructionResponse.statusCode).to.equal(201);
              expect(
                makeInstructionResponse.body.transformations[0].before.color
              ).to.eql(downPinkTriangle.color);
              expect(
                makeInstructionResponse.body.transformations[0].after.color
              ).to.eql(incomingTriangleDownOrange.color);
              expect(
                makeInstructionResponse.body.transformations[1].before.color
              ).to.eql(upPinkTriangle.color);
              expect(
                makeInstructionResponse.body.transformations[1].after.color
              ).to.eql(incomingTriangleUpOrange.color);

              request(app)
                .get("/widgets")
                .end(function(err, getWidgetResponse) {
                  //there should only be one widget that now has the color yellow
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(3);
                  expect(getWidgetResponse.body.data[1].color).to.eql(
                    incomingTriangleDownOrange.color
                  );
                  expect(getWidgetResponse.body.data[2].color).to.eql(
                    incomingTriangleUpOrange.color
                  );
                  done();
                });
            });
        });
    });
  });
  describe("Outgoing Instructions", function() {
    it("should return something different then the database", function(done) {
      this.timeout(5000);
      request(app)
        .post("/widgets")
        .send(strangeBottomYellowSquare)
        .end(function(err, makeWidgetResponse) {
          request(app)
            .post("/instructions")
            .send(outgoingSquareStrangeBottomGreen)
            .end(function(err, makeInstructionResponse) {
              //transformation should be empty
              expect(makeInstructionResponse.statusCode).to.equal(201);
              expect(makeInstructionResponse.body.transformations).to.be.an(
                "array"
              );
              expect(
                makeInstructionResponse.body.transformations.length
              ).to.eql(0);
              request(app)
                .get("/widgets")
                .end(function(err, getWidgetResponse) {
                  console.log(
                    "============getWidgetResponse========================"
                  );
                  console.log(getWidgetResponse.body);
                  console.log("====================================");

                  //there should only be one widget that now has the color yellow
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(4);
                  expect(getWidgetResponse.body.data[3].color).to.eql(
                    outgoingSquareStrangeBottomGreen.color
                  );
                  expect(
                    getWidgetResponse.body.transformations[0].before.color
                  ).to.eql(strangeBottomYellowSquare.color);
                  expect(
                    getWidgetResponse.body.transformations[0].after.color
                  ).to.eql(outgoingSquareStrangeBottomGreen.color);
                  done();
                });
            });
        });
    });
    it("should work with multiples", function(done) {
      this.timeout(5000);
      request(app)
        .post("/widgets")
        .send([downPinkTriangle, upPinkTriangle])
        .end(function(err, makeWidgetResponse) {
          request(app)
            .post("/instructions")
            .send([incomingTriangleDownOrange, incomingTriangleUpOrange])
            .end(function(err, makeInstructionResponse) {
              expect(makeInstructionResponse.statusCode).to.equal(201);
              expect(
                makeInstructionResponse.body.transformations[0].before.color
              ).to.eql(downPinkTriangle.color);
              expect(
                makeInstructionResponse.body.transformations[0].after.color
              ).to.eql(incomingTriangleDownOrange.color);
              expect(
                makeInstructionResponse.body.transformations[1].before.color
              ).to.eql(upPinkTriangle.color);
              expect(
                makeInstructionResponse.body.transformations[1].after.color
              ).to.eql(incomingTriangleUpOrange.color);

              request(app)
                .get("/widgets")
                .end(function(err, getWidgetResponse) {
                  //there should only be one widget that now has the color yellow
                  expect(getWidgetResponse.statusCode).to.equal(200);
                  expect(getWidgetResponse.body.data).to.be.an("array");
                  expect(getWidgetResponse.body.data.length).to.eql(3);
                  expect(getWidgetResponse.body.data[1].color).to.eql(
                    incomingTriangleDownOrange.color
                  );
                  expect(getWidgetResponse.body.data[2].color).to.eql(
                    incomingTriangleUpOrange.color
                  );
                  done();
                });
            });
        });
    });
  });
});
