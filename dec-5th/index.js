const vents = require("./vents");

const findAllVectorCoordinates = (start, end) => {
  let allVectorCoordinates = [[...start]];
  let nextCoord = [...start];

  const [xChange, yChange] = [end[0] - start[0], end[1] - start[1]];
  // const ventLength = Math.sqrt(xChange ** 2 + yChange ** 2);

  while (
    allVectorCoordinates[allVectorCoordinates.length - 1][0] !== end[0] ||
    allVectorCoordinates[allVectorCoordinates.length - 1][1] !== end[1]
  ) {
    if (xChange >= 1) nextCoord[0]++;
    if (xChange <= -1) nextCoord[0]--;
    if (yChange >= 1) nextCoord[1]++;
    if (yChange <= -1) nextCoord[1]--;

    allVectorCoordinates.push([...nextCoord]);
  }
  // console.log([xChange, yChange]);
  return allVectorCoordinates;
};

const ventPlotter = (vents) => {
  const zeroArr = new Array(1000).fill(0);
  let field = zeroArr.map(() => new Array(1000).fill(0));

  vents.forEach((vent) => {
    const ventCoordinates = findAllVectorCoordinates(vent.start, vent.end);
    ventCoordinates.forEach((ventCo) => {
      field[ventCo[0]][ventCo[1]]++;
    });
  });

  const countOverOnes = (count, num) => (num > 1 ? count + 1 : count);
  // const ventVertexCount = field.map((row) => row.reduce(countOverOnes, 0));
  const ventVertexCount = field.reduce(
    (sum, row) => sum + row.reduce(countOverOnes, 0),
    0
  );
  return ventVertexCount;
};

// 1st star
// filter out horizontal and vertical vents
const ventsHV = vents.filter(
  (vent) => vent.start[0] === vent.end[0] || vent.start[1] === vent.end[1]
);

const xMaxHV = ventsHV.reduce(
  (max, coordinates) => (coordinates.end[0] >= max ? coordinates.end[0] : max),
  0
);
const yMaxHV = ventsHV.reduce(
  (max, coordinates) => (coordinates.end[1] >= max ? coordinates.end[1] : max),
  0
);
console.log("1st star");
console.log(vents.length, "filtered to", ventsHV.length);
console.log("largest values - x:", xMaxHV, "y:", yMaxHV);
console.log(ventPlotter(ventsHV));

// 2nd star
// filter out horizontal and vertical vents
const xMax = vents.reduce(
  (max, coordinates) => (coordinates.end[0] >= max ? coordinates.end[0] : max),
  0
);
const yMax = vents.reduce(
  (max, coordinates) => (coordinates.end[1] >= max ? coordinates.end[1] : max),
  0
);
console.log("\n2nd star");
console.log("largest values - x:", xMax, "y:", yMax);
console.log(ventPlotter(vents));
