module.exports = {
  fakeInstructions: {
    incomingSingle: {
      direction: "incoming",
      criteria: ["circle"],
      color: "pink"
    },
    incomingSingleDUP: {
      direction: "incoming",
      criteria: ["circle"],
      color: "blue"
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
    },
    outgoingMultiple2: {
      direction: "outgoing",
      criteria: ["circle", "down", "up"],
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
      shape: "triangle",
      qualities: ["up"]
    },
    downPinkTriangle: {
      color: "pink",
      shape: "triangle",
      qualities: ["down"]
    },
    strangeBottomYellowSquare: {
      color: "yellow",
      shape: "square",
      qualities: ["strange, bottom"]
    }
  }
};
