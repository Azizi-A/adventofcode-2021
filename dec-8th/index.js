const { readFileSync } = require("fs");

const displayData = readFileSync("./dec-8th/display-data.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(" | ").map((y) => y.split(" ")));

console.log("total numbers:", displayData.length);
// 1st star
// On a seven-segment display ...
// 1 = 2 on, 4 = 4 on, 7 = 3 on, 8 = 7 on each uniquely
const count1s4s7sAnd8s = (count, output) =>
  [2, 4, 3, 7].includes(output.length) ? count + 1 : count;
console.log(
  "count of 1s 4s 7s And 8s:",
  displayData.reduce(
    (sum, code) => sum + code[1].reduce(count1s4s7sAnd8s, 0),
    0
  )
);

// 2nd star
const countWires = (count, displayNum) => {
  ["a", "b", "c", "d", "e", "f", "g"].forEach((wire) => {
    if (displayNum.includes(wire)) count[wire]++;
  });
  return count;
};

const findNumber = (output, wireCount) => {
  const num = output.map((wires) => {
    if (wires.length === 2) return "1";
    if (wires.length === 4) return "4";
    if (wires.length === 3) return "7";
    if (wires.length === 7) return "8";
    const wireFreq = wires.split("").map((wire) => wireCount[wire]);
    if (
      wireFreq.includes(9) &&
      wireFreq.includes(8) &&
      wireFreq.includes(7) &&
      wireFreq.includes(6) &&
      !wireFreq.includes(4)
    ) {
      if (wireFreq.length === 5) return "5";
      if (wireFreq.length === 6) return "9";
    }
    if (wireFreq.filter((f) => f === 8).length === 1) return "6";
    if (wireFreq.filter((f) => f === 7).length === 1) return "0";
    if (wireFreq.includes(4)) return "2";
    if (wireFreq.includes(9)) return "3";
    throw new Error("digit missed");
  });
  return parseFloat(num.join(""));
};

const startingCount = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 };
const wireCounts = displayData.map((codeAndOutput) =>
  codeAndOutput[0].reduce(countWires, { ...startingCount })
);
const outputNums = displayData.map((dd, i) => findNumber(dd[1], wireCounts[i]));

console.log(
  "sum of numbers:",
  outputNums.reduce((sum, num) => sum + num)
);
