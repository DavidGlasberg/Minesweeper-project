const symbolMine = 10;
// const boardObj = {
//     size: 0,
//     mines: 0,
//     minesLocations: [],
//     board: []
// }
const creatNewObj = () => {
    return {
        size: 0,
        mines: 0,
        minesLocations: [],
        board: []}
}

const initialNewBoard = (sizeBoard, mines) => {
    const boardObj = {
        size: sizeBoard,
        mines: mines,
        minesLocations: [],
        board: []}
    
    createEmptyBoard(boardObj);
    placingMinesRandom(boardObj);
    calculateAdjacentMines(boardObj);

    console.log(boardObj);
    
    return boardObj;
}
const createEmptyBoard = (boardObj) => {
    const newBoard = [];
    for (let r = 0; r < boardObj.size; r++){ //rows
        const row = [];
        for (let c = 0; c < boardObj.size; c++){
            row.push({
                row: r,
                col: c,
                value: 0,
                flag: false,
                revealed: false
            });
        }
        newBoard.push(row);
    }
    boardObj.board = newBoard
    // console.log('the board after create: ' + newBoard);
}
const placingMinesRandom = (boardObj) => {
    
    while (boardObj.minesLocations.length < boardObj.mines){
        const randomRow = Math.floor(Math.random() * boardObj.size);
        const randomCol = Math.floor(Math.random() * boardObj.size);
        if (boardObj.board[randomRow][randomCol].value === 0){ // check  if cell is availiable
            boardObj.board[randomRow][randomCol].value = 10; // 10 is symbol to mines value
            boardObj.minesLocations.push({ //Entering the location into memory
                row: randomRow,
                col: randomCol
            });
        }
    }
    return boardObj;
}
const calculateAdjacentMines = (boardObj) => {
    let upperBound = boardObj.size;
    let lowerBound = 0;
    boardObj.minesLocations.forEach(mine => {
        for (let r = mine.row - 1; r <= mine.row+1; r++){
            for (let c = mine.col - 1; c <= mine.col+1; c++){
                if (r >= lowerBound && r < upperBound && c >= lowerBound && c < upperBound){
                    if (boardObj.board[r][c].value !== symbolMine){
                        boardObj.board[r][c].value++;
                    }
                }
            }
        }
    });
    return boardObj;
}

exports.initialNewBoard = initialNewBoard;
