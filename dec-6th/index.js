const { readFileSync } = require("fs");

const startingFish = readFileSync("./dec-6th/fish.txt", "utf-8").split(",");

// first star
let fishPopulation = startingFish;

for (let i = 0; i < 80; i++) {
  let count = 0;
  const tickOneDay = (fish) => {
    fish--;
    if (fish < 0) {
      count++;
      fish = 6;
    }
    return fish;
  };

  fishPopulation = fishPopulation.map(tickOneDay);

  newFish = new Array(count).fill(8);
  fishPopulation = fishPopulation.concat(newFish);
}

console.log(fishPopulation.length);

// 2nd star
let fishPopulation2 = startingFish.reduce((arr, fish) => {
  arr[fish]++;
  return arr;
}, new Array(9).fill(0));

for (let i = 0; i < 256; i++) {
  let zeroDayCount;
  const tickOneDay2 = (sameDayFish, days, population) => {
    if (days < 8) {
      if (days === 0) zeroDayCount = sameDayFish;
      sameDayFish = population[days + 1];
      if (days === 6) sameDayFish = sameDayFish + zeroDayCount;
    } else if (days === 8) {
      sameDayFish = zeroDayCount;
    }
    return sameDayFish;
  };

  fishPopulation2 = fishPopulation2.map(tickOneDay2);
}

console.log(fishPopulation2.reduce((x, y) => x + y));
