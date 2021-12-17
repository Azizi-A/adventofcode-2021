const { readFileSync } = require("fs");

const energies = readFileSync("./dec-11th/energy.txt", "utf-8")
  .split("\n")
  .map((row) => row.split("").map(parseFloat));

const increaseEnergy = (energy) => energy + 1;
const neighbouringFlash = (energy, x, y, energies) => {
  // increase energy by 1 for each flashing neighbour
  let energyIncrease = 0;
  for (i of [-1, 0, 1]) {
    for (j of [-1, 0, 1]) {
      let a = x + i;
      let b = y + j;
      if (
        !(i === 0 && j === 0) &&
        a >= 0 &&
        a < 10 &&
        b >= 0 &&
        b < 10 &&
        energy > 0 &&
        energies[a][b] > 9
      ) {
        energyIncrease++;
      }
    }
  }
  return energy + energyIncrease;
};
const flashAll = (energies) => {
  const newEnergies = energies.map((row, x) =>
    row.map((energy, y) => neighbouringFlash(energy, x, y, energies))
  );
  return newEnergies;
};
const resetFlashed = (oldEnergy, newEnergy) => (oldEnergy > 9 ? 0 : newEnergy);
const countFlashed = (energies) =>
  energies
    .flat()
    .reduce((count, energy) => (energy === 0 ? count + 1 : count), 0);

// all the processes for on time step
const step = (energies) => {
  energies = energies.map((row) => row.map((energy) => energy + 1));
  for (i of new Array(32)) {
    let newEnergies = flashAll(energies);
    energies = newEnergies.map((row, i) =>
      row.map((energy, j) => resetFlashed(energies[i][j], energy))
    );
  }
  const flashCount = countFlashed(energies);
  return { energies, flashCount };
};

// 1st star
const energySteps = new Array(101);
energySteps[0] = {
  energies: energies,
  flashCount: 0,
};
for (let i = 1; i <= 100; i++) {
  energySteps[i] = step(energySteps[i - 1].energies);
}

const totalCount = energySteps.reduce((total, es) => es.flashCount + total, 0);

console.log("totalCount at 100 steps:", totalCount);

// 2nd star
const energySteps2 = [
  {
    energies: energies,
    flashCount: 0,
  },
];
while (true) {
  energySteps2.push(step(energySteps2[energySteps2.length - 1].energies));
  if (energySteps2[energySteps2.length - 1].flashCount === 100) break;
}

console.log("\nsteps for synchronised flash:", energySteps2.length - 1);
