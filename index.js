const { rotate90, rotate270 } = require('2d-array-rotation');

const dim = 3;
const getMiniBoard = () => {
    const mini = []
    for (let r = 0; r < dim; r+=1){
        const inner = [];
        for (let c = 0; c < dim; c+=1){
            inner.push(null);
        }
        mini.push(inner);
    }
    return mini;
}

const A = getMiniBoard();
const B = getMiniBoard();
const C = getMiniBoard();
const D = getMiniBoard();

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


putPiece(5, BOARD.A, 2, 2);
console.log(getBoard());

rotateMini(BOARD.A);

console.log(BOARD);
console.log(getBoard());

const action = (piece, miniToPutPiece, rowIndex, colIndex, miniToRotate, ccw) => {
    putPiece(piece, miniToPutPiece, rowIndex, colIndex);
    rotateMini(miniToRotate, ccw);
};


const isGameOver = () => {
    const board = getBoard();
    for(let r = 0; r < board.length; r+=1){
        for(let c = 0; c < board[0].length; c+=1){
            
        }
    }
}