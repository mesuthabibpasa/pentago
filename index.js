const _ = require('lodash')
const prompt = require('prompt')
const { rotate90, rotate270 } = require('2d-array-rotation')

const KEYS_IN_A_ROW_WIN_LIMIT = 5
const dim = 3
const getMiniBoard = () => {
  const mini = []
  for (let r = 0; r < dim; r+=1) {
    const inner = []
    for (let c = 0; c < dim; c+=1) {
      inner.push(null)
    }
    mini.push(inner)
  }
  return mini
}

const A = getMiniBoard()
const B = getMiniBoard()
const C = getMiniBoard()
const D = getMiniBoard()

const BOARD = {
  A,
  B,
  C,
  D,
}

const getBoard = () => {
  return [
    [...BOARD.A[0], ...BOARD.B[0]],
    [...BOARD.A[1], ...BOARD.B[1]],
    [...BOARD.A[2], ...BOARD.B[2]],
    [...BOARD.C[0], ...BOARD.D[0]],
    [...BOARD.C[1], ...BOARD.D[1]],
    [...BOARD.C[2], ...BOARD.D[2]]
  ]
};


const putPiece = (piece, mini, rowIndex, colIndex) => {
  mini[rowIndex][colIndex] = piece;
}

const rotateMini = (mini, isCCW = false) => {
  const rotatedMini = isCCW ? rotate270(mini) : rotate90(mini);

  rotatedMini.forEach((r, ri) => {
    r.forEach((c, ci) => {
      mini[ri][ci] = rotatedMini[ri][ci];
    })
  });
}

const action = (piece, miniToPutPiece, rowIndex, colIndex, miniToRotate, ccw) => {
    putPiece(piece, miniToPutPiece, rowIndex, colIndex);
    const winnerAfterPutPiece = isGameOver()
    if (winnerAfterPutPiece) {
      return winnerAfterPutPiece
    }
    rotateMini(miniToRotate, ccw);
    const winnerAfterRotateMini = isGameOver()
    if (winnerAfterRotateMini) {
      return winnerAfterRotateMini
    }

    return null
};

const isGameOver = () => {
  const winners = []
  const board = getBoard();
  for (let r = 0; r < board.length; r+=1) {
    for (let c = 0; c < board[0].length; c+=1) {
      const winner = search(board, r, c)
      if (winner) {
        winners.push(winner)
      }
    }
  }

  const uniqWinners = _.uniq(winners)
  if (uniqWinners.length === 0) {
    return null
  }

  return _.uniq(winners).length === 1 ? winners[0] : 0
}

const directions = {
  upRight: [-1, 1],
  right: [0, 1],
  downRight: [1, 1],
  down: [1, 0]
}

const search = (board, r, c) => {
  if (board[r][c] === null) {
    return null
  }

  for (let d = 0; d < Object.keys(directions).length; d += 1) {
    const dir = Object.keys(directions)[d]
    const winner = searchInDirection(board, r, c, 1, dir)
    if (winner) {
      return winner
    }
  }

  return null
}

const searchInDirection = (board, r, c, keysInARow, dir) => {
  const [rr, cc] = directions[dir]
  if (r + rr < 0 || c + cc < 0 || r + rr >= board.length || c + cc >= board[0].length) {
    return null
  }

  if (keysInARow === KEYS_IN_A_ROW_WIN_LIMIT) {
    return board[r][c]
  }

  if (board[r][c] === board[r + rr][c + cc]) {
    return searchInDirection(board, r + rr, c + cc, keysInARow + 1, dir)
  }

  return null
}

search(getBoard(), 0, 0)


async function init () {
  let winner = null
  prompt.start();
  const players = [1, -1]
  let turn = 0
  while (winner === null) {
    const { userAction } = await prompt.get(['userAction']);
    const [boardToPutPiece, rIndex, cIndex, boardToRotate, isCCW] = userAction.split('_')
    winner = action(players[turn % 2], BOARD[boardToPutPiece], +rIndex, +cIndex, BOARD[boardToRotate], isCCW === 'true')
    console.log(getBoard())
    turn++
  }

  if (winner === 0) {
    console.log(`It is a draw`)
  } else {
    console.log(`Player ${winner} won in ${turn} turns!`)
  }
}

init()

// Only accept valid userActions
// Better interface for entering user actions
// If user tries to put piece on a non-empty space, it should fail

