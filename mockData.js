module.exports = {
  fakeInstructions: {
    incomingSingle: {
      direction: "incoming",
      criteria: ["circle"],
      color: "pink"
    },
    incomingMultiple: {
      direction: "incoming",
      criteria: ["circle", "down"],
      color: "red"
    },
    outgoingSingle: {
      direction: "outgoing",
      criteria: ["circle"],
      color: "pink"
    },
    outgoingMultiple: {
      direction: "outgoing",
      criteria: ["circle", "down"],
      color: "red"
    }
  },
  fakeWidgets: {
    downRedCircle: {
      color: "red",
      shape: "circle",
      qualities: ["down"]
    },
    upPinkTriangle: {
      color: "pink",
      shape: "triange",
      qualities: ["up"]
    },
    strangeBottomYellowSquare: {
      color: "yellow",
      shape: "square",
      qualities: ["strange, bottom"]
    }
  }
};
