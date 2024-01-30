import fs from 'fs';

//https://lisperator.net/blog/javascript-sudoku-solver/

// index -> { row, col }
function i2rc(index) {
  return { row: Math.floor(index / 9), col: index % 9 };
}

// { row, col } -> index
function rc2i(row, col) {
  return row * 9 + col;
}

process.argv
  .filter((_, index) => index > 1)
  .forEach(filename => {
    console.log('doing ' + filename)
    const fileContent = JSON.parse(fs.readFileSync(filename).toString())
    if (fileContent.puzzleData.answers) {
      console.log('skipping ' + filename)
      return
    }
    const solution = [...fileContent.puzzleData.startingGrid]

    function acceptable(board, index, value) {
      let { row, col } = i2rc(index);

      // if already present on the column, not acceptable
      for (let r = 0; r < 9; ++r)
        if (board[rc2i(r, col)] == value) return false;

      // if already present on the row, not acceptable
      for (let c = 0; c < 9; ++c)
        if (board[rc2i(row, c)] == value) return false;

      const groupKey = fileContent.puzzleData.layout[index]
      if (fileContent.puzzleData.layout
        .some((key, layoutIndex) => key === groupKey && value === board[layoutIndex])) {
        return false
      }

      // we have a "go"
      return true;
    }

    function getChoices(solution, index) {
      let choices = [];
      for (let value = 1; value <= 9; ++value) {
        if (acceptable(solution, index, value)) {
          choices.push(value);
        }
      }
      return choices;
    }

    function solve() {
      let { index, moves } = bestBet(solution);    // find the best place to fill
      if (index == null) return true;           // we filled'em all, success!
      for (let m of moves) {
        solution[index] = m;                     // try one choice
        if (solve()) return true;             // if we solved further, success!
      }
      solution[index] = 0;                         // no digit fits here, backtrack!
      return false;
    }

    function bestBet(board) {
      let index, moves, bestLen = 100;
      for (let i = 0; i < 81; ++i) {
        if (!board[i]) {
          let m = getChoices(board, i);
          if (m.length < bestLen) {
            bestLen = m.length;
            moves = m;
            index = i;
            if (bestLen == 0) break;
          }
        }
      }
      return { index, moves };
    }

    const final = solve(0)
    if (final) {
      fileContent.puzzleData.answers = solution
      fs.writeFileSync(filename, JSON.stringify(fileContent, null, 2))
      console.log('done ' + filename)
    } else {
      console.error('error ' + filename)
    }

  })