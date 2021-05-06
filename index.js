const { rotate90, rotate270 } = require('2d-array-rotation');

const getMiniBoard = () => {
    const mini = []
    for (let r = 0; r < 3; r+=1){
        const inner = [];
        for (let c = 0; c < 3; c+=1){
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


const getBoard = () => {
    return [
        [...A[0], ...B[0]],
        [...A[1], ...B[1]],
        [...A[2], ...B[2]],
        [...C[0], ...D[0]],
        [...C[1], ...D[1]],
        [...C[2], ...D[2]]
    ]
};

const BOARD = {
    A,
    B,
    C,
    D,
}

const putPiece = (piece, mini, rowIndex, colIndex) => {
    mini[rowIndex][colIndex] = piece;
}

const rotateMini = (mini, isCCW = false) => {
    const rotatedMini = isCCW ? rotate270(mini) : rotate90(mini);
    // mini = rotatedMini; 
    rotatedMini.forEach((r, ri) => {
        r.forEach((c, ci) => {
            mini[ri][ci] = rotatedMini[ri][ci];
        })        
    });
}

console.log(getBoard());

putPiece(5, BOARD.A, 2, 2);

rotateMini(BOARD.A);

console.log(A);
console.log(getBoard());