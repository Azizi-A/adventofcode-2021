const { readFileSync } = require("fs");

const topography = readFileSync("./dec-9th/topography.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map((height) => parseFloat(height)));
// console.losg(topography[0]);

const findMinima = (array2D) => {
  let minima = [];
  array2D.forEach((row, i) => {
    row.forEach((height, j) => {
      if (
        (j < 1 || height < array2D[i][j - 1]) &&
        (j >= row.length - 1 || height < array2D[i][j + 1]) &&
        (i < 1 || height < array2D[i - 1][j]) &&
        (i >= array2D.length - 1 || height < array2D[i + 1][j])
      )
        minima.push({
          height,
          position: {
            x: i,
            y: j,
          },
        });
    });
  });
  return minima;
};

const findBasinSize = (array2D, pos) => {
  let basin = [pos];

  const findBasinNext = (pos, basin) => {
    let basinNexts = [];
    const xNext = [
      pos.position.x,
      pos.position.x + 1,
      pos.position.x,
      pos.position.x - 1,
    ];
    const yNext = [
      pos.position.y + 1,
      pos.position.y,
      pos.position.y - 1,
      pos.position.y,
    ];

    for (let i = 0; i < 4; i++) {
      const x = xNext[i];
      const y = yNext[i];
      if (x >= 0 && x < array2D.length && y >= 0 && y < array2D[0].length) {
        const basinNext = {
          height: array2D[x][y],
          position: { x, y },
        };
        if (
          basinNext.height !== 9 &&
          !basin.find(
            (b) =>
              b.position.x === basinNext.position.x &&
              b.position.y === basinNext.position.y
          )
        ) {
          basinNexts.push(basinNext);
        }
      }
    }

    return basinNexts.filter(
      (b) =>
        basinNexts.find(
          (d) => d.position.x === b.position.x && d.position.y === b.position.y
        ) === b
    );
  };

  while (true) {
    let newBasin = [...basin];
    basin.forEach(
      (b) => (newBasin = newBasin.concat(findBasinNext(b, newBasin)))
    );
    if (newBasin.length === basin.length) break;
    basin = [...newBasin];
  }

  return basin;
};

const minima = findMinima(topography);

//  1st star
const risk = minima.map((minimum) => minimum.height + 1);
const sumRisk = risk.reduce((sum, r) => sum + r);
console.log("summed risk:", sumRisk);

// 2nd star
const basins = minima.map((m) => findBasinSize(topography, m));
const basinSizes = basins.map((b) => b.length);
const largestBasins = basinSizes.sort((a, b) => a - b).slice(-3);
console.log("largest basins are:", ...largestBasins);
console.log(
  "largest basins score:",
  largestBasins[0] * largestBasins[1] * largestBasins[2]
);
