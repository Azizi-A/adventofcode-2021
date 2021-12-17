const course = require("./course.json");

// 1st star
const vectorise = (pre, curDirection) => ({
  x:
    pre.x +
    (curDirection.match(/forward/)
      ? parseFloat(curDirection[curDirection.length - 1])
      : curDirection.match(/backward/)
      ? -parseFloat(curDirection[curDirection.length - 1])
      : 0),
  y:
    pre.y +
    (curDirection.match(/down/)
      ? parseFloat(curDirection[curDirection.length - 1])
      : curDirection.match(/up/)
      ? -parseFloat(curDirection[curDirection.length - 1])
      : 0),
});

const vector = course.reduce(vectorise, { x: 0, y: 0 });
console.log(vector, vector.x * vector.y);

// 2nd star
const vectorise2 = (pre, curDirection) => ({
  aim:
    pre.aim +
    (curDirection.match(/down/)
      ? parseFloat(curDirection[curDirection.length - 1])
      : curDirection.match(/up/)
      ? -parseFloat(curDirection[curDirection.length - 1])
      : 0),
  x:
    pre.x +
    (curDirection.match(/forward/)
      ? parseFloat(curDirection[curDirection.length - 1])
      : curDirection.match(/backward/)
      ? -parseFloat(curDirection[curDirection.length - 1])
      : 0),
  y:
    pre.y +
    (curDirection.match(/forward/)
      ? parseFloat(curDirection[curDirection.length - 1]) * pre.aim
      : curDirection.match(/backward/)
      ? -parseFloat(curDirection[curDirection.length - 1]) * pre.aim
      : 0),
});

const vector2 = course.reduce(vectorise2, { aim: 0, x: 0, y: 0 });
console.log(vector2, vector2.x * vector2.y);
