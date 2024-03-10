const symbolMine = 10;
// const gameObj = {
//     size: 0,
//     mines: 0,
//     minesLocations: [],
//     board: []
// }

export const initialNewGame = (sizeBoard, minesAmount) => {
    const gameObj = {
        size: sizeBoard,
        mines: minesAmount,
        minesLocations: [],
        board: []}
    
    createEmptyBoard(gameObj);
    placingMinesRandom(gameObj);
    calculateAdjacentMines(gameObj);
    
    return gameObj;
}

const createEmptyBoard = (gameObj) => {
    const newBoard = [];
    for (let r = 0; r < gameObj.size; r++){ //rows
        const row = [];
        for (let c = 0; c < gameObj.size; c++){
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
    gameObj.board = newBoard
}

const placingMinesRandom = (gameObj) => {
    
    while (gameObj.minesLocations.length < gameObj.mines){
        const randomRow = Math.floor(Math.random() * gameObj.size);
        const randomCol = Math.floor(Math.random() * gameObj.size);
        if (gameObj.board[randomRow][randomCol].value === 0){ // check  if cell is availiable
            gameObj.board[randomRow][randomCol].value = 10; // 10 is symbol to mines value
            gameObj.minesLocations.push({ //Entering the location into memory
                row: randomRow,
                col: randomCol
            });
        }
    }
    return gameObj;
}
const calculateAdjacentMines = (gameObj) => {
    let upperBound = gameObj.size;
    let lowerBound = 0;
    gameObj.minesLocations.forEach(mine => {
        for (let r = mine.row - 1; r <= mine.row+1; r++){
            for (let c = mine.col - 1; c <= mine.col+1; c++){
                if (r >= lowerBound && r < upperBound && c >= lowerBound && c < upperBound){
                    if (gameObj.board[r][c].value !== symbolMine){
                        gameObj.board[r][c].value++;
                    }
                }
            }
        }
    });
    return gameObj;
}
