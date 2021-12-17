const { readFileSync } = require("fs");

const startingPos = readFileSync("./dec-7th/crab-positions.txt", "utf-8")
  .split(",")
  .map(parseFloat);

const minPos = Math.min(...startingPos);
const maxPos = Math.max(...startingPos);

const findFuelCost = (scaleFunction) => {
  let fuelCost = [];
  for (let i = minPos; i < maxPos; i++) {
    fuelCost[i] = startingPos.reduce(
      (fuelSpent, x) => fuelSpent + scaleFunction(x - i),
      0
    );
  }

  const minFuel = Math.min(...fuelCost);
  const minFuelPos = fuelCost.indexOf(minFuel);
  return { minFuel, minFuelPos };
};

// 1st star
linerScale = (x) => Math.abs(x);
console.log(findFuelCost(linerScale));

// 2nd star
triangleScale = (x) => {
  let absX = Math.abs(x);
  let sumX = 0;
  for (let i = absX; i > 0; i--) {
    sumX = sumX + i;
  }
  return sumX;
};
console.log(findFuelCost(triangleScale));
