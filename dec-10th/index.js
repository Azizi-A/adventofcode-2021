const { readFileSync } = require("fs");

const chunks = readFileSync("./dec-10th/chunks.txt", "utf-8").split("\n");

const removeSameBracketPairs = (row) => {
  while (true) {
    const newRow = row
      .replaceAll("()", "")
      .replaceAll("[]", "")
      .replaceAll("{}", "")
      .replaceAll("<>", "");
    if (row.length === newRow.length) break;
    row = newRow;
  }
  return row;
};

const removeBracketPairs = (row) => {
  const anyBracketPairs = /[\(\[\{\<][\)\]\}\>]/g;
  while (true) {
    const newRow = row.replaceAll(anyBracketPairs, "");
    if (row.length === newRow.length) break;
    row = newRow;
  }
  return row;
};

const findMismatchedBrackets = (row) => {
  const anyBracketPair = /[\(\[\{\<][\)\]\}\>]/;
  return removeSameBracketPairs(row).match(anyBracketPair)?.[0] || null;
};

const mismatchedBrackets = chunks.map(findMismatchedBrackets);

// 1st star
const score = mismatchedBrackets.reduce((sumScore, mb) => {
  let points = 0;
  if (mb) {
    if (mb[1] === ")") points += 3;
    if (mb[1] === "]") points += 57;
    if (mb[1] === "}") points += 1197;
    if (mb[1] === ">") points += 25137;
  }
  return points + sumScore;
}, 0);

console.log("1st star:", score);

// 2nd star
const rowsUncorrupted = chunks.filter((_, i) => !mismatchedBrackets[i]);
const unclosedBrackets = rowsUncorrupted.map(removeBracketPairs);

const closeBrackets = (str) =>
  str.split("").reduce((brackets, char) => {
    if (char === "(") return ")" + brackets;
    if (char === "[") return "]" + brackets;
    if (char === "{") return "}" + brackets;
    if (char === "<") return ">" + brackets;
  }, "");

const missingBrackets = unclosedBrackets.map(closeBrackets);

const findScore = (brackets) =>
  brackets.split("").reduce((score, bracket) => {
    let points = 0;
    if (bracket === ")") points += 1;
    if (bracket === "]") points += 2;
    if (bracket === "}") points += 3;
    if (bracket === ">") points += 4;
    return score * 5 + points;
  }, 0);
const scores = missingBrackets.map(findScore);

console.log("2nd star:", scores.sort((a, b) => a - b)[(scores.length - 1) / 2]);
