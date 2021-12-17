const report = require("./power-consumption.json");

const n = report[0].length;
const m = report.length;

// 1st star
let gammaArr = [];
for (let i = 0; i < n; i++) {
  gammaArr[i] = Math.round(
    report.reduce((pre, cur) => pre + parseInt(cur[i]), 0) / m
  );
}

const epsilonArr = gammaArr.map((bit) => +!bit);
const gamma = parseInt(gammaArr.join(""), 2);
const epsilon = parseInt(epsilonArr.join(""), 2);
console.log(gamma, "x", epsilon, "=", gamma * epsilon);

// 2nd star
let oxy = report;

for (let i = 0; i < n; i++) {
  if (oxy.length <= 1) {
    break;
  }
  let commonBitValue = Math.round(
    oxy.reduce((pre, cur) => pre + parseInt(cur[i]), 0) / oxy.length
  );
  oxy = oxy.filter((rating) => rating[i] == commonBitValue);
}
oxy = parseInt(oxy.join(""), 2);

let co2 = report;

for (let i = 0; i < n; i++) {
  if (co2.length <= 1) {
    break;
  }

  let avgBitValue =
    co2.reduce((pre, cur) => pre + parseInt(cur[i]), 0) / co2.length;
  let uncommonBitValue =
    avgBitValue === 1.0 || avgBitValue === 0.0
      ? avgBitValue
      : +!Math.round(avgBitValue);

  co2 = co2.filter((rating) => rating[i] == uncommonBitValue);
}
co2 = parseInt(co2.join(""), 2);

console.log(oxy, "x", co2, "=", oxy * co2);
