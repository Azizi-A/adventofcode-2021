// Star 1
const depths = require("./depths.json");

const reducer = (previous, curDepth) => ({
  depth: curDepth,
  count: previous.count + (curDepth > previous.depth ? 1 : 0),
});

console.log(depths.reduce(reducer, { depth: depths[0], count: 0 }));

// Star 2
const reducer2 = (previous, curDepth, i, depths) => ({
  depth: curDepth,
  count:
    previous.count +
    (curDepth + depths[i + 1] + depths[i + 2] >
    previous.depth + curDepth + depths[i + 1]
      ? 1
      : 0),
});

const count2 = depths.reduce(reducer2, { depth: depths[0], count: 0 }).count;
console.log(count2);
