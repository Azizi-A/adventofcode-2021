const { boards, draws } = require("./bingo.json");

let boardsFinished = [];

for (let i = 0; i < draws.length; i++) {
  const numberDrawn = draws[i];

  if (i >= 5) {
    const numbersDrawn = draws.slice(0, i + 1);
    const countMatches = (preNum, curNum) =>
      numbersDrawn.find((d) => curNum === d)
        ? parseFloat(preNum) + 1
        : parseFloat(preNum);

    let score;
    boards.forEach((board, j) => {
      for (let k = 0; k < board.length; k++) {
        // row
        const row = board[k];
        let rowMatch = row.reduce(countMatches, 0);
        // column
        const column = board.map((row) => row[k]);
        let columnMatch = column.reduce(countMatches, 0);
        // bingo
        if (rowMatch >= 5 || columnMatch >= 5) {
          let unmarkedSum = board.reduce(
            (sum, row) =>
              sum +
              row.reduce(
                (sum, n) =>
                  numbersDrawn.find((d) => n === d)
                    ? parseFloat(sum)
                    : parseFloat(sum) + parseFloat(n),
                0
              ),
            0
          );

          score = unmarkedSum * numberDrawn;

          if (!boardsFinished.includes(j)) {
            boardsFinished.push(j);
            console.log(
              "board number:",
              j,
              "ball number:",
              i,
              "numberDrawn:",
              numberDrawn,
              "unmarkedSum:",
              unmarkedSum,
              "score:",
              score
            );
          }
        }
      }
    });
    if (score) {
      if (boardsFinished.length === boards.length) {
        break;
      }
    }
  }
}
