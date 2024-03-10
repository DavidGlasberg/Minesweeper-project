import { useState } from "react";
import { initialNewBoard } from "../LogicSide";

export const useGameFlow = () => {

    const [currentGameObj, setGameObj] = useState(initialNewBoard(9, 10));
    const [currentNonMinesHidden, setNonMinesHidden] = useState(currentGameObj.size * currentGameObj.size - currentGameObj.mines);
    const [gameOver, setGameOver] = useState(false);

    const disableGame = currentNonMinesHidden === 0;
    const currentBoard = currentGameObj.board;

    const setBoard = (board) => {
        setGameObj(prev => {
            return {
                ...prev,
                board
            }
        })
    }

    const startNewGame = (sizeBoard, minesAmount) => {
        setGameObj(initialNewBoard(sizeBoard, minesAmount));
        setGameOver(false);
        setNonMinesHidden(sizeBoard * sizeBoard - minesAmount);
    }

    const handleToReveal = (rowIndex, colIndex) => {
        if (!disableGame) {
            const cell = currentBoard[rowIndex][colIndex];
            if (!cell.revealed && !gameOver && !cell.flag) {

                if (cell.value === 10) { // is mine!
                    setGameOver(true);
                    setNonMinesHidden(0);
                    revealsRemainingMines(rowIndex, colIndex);
                    return;
                }
                setNonMinesHidden(prev => prev - 1);
                cell.revealed = true;
                if (cell.value === 0) {
                    revealAdjcent(rowIndex, colIndex); // board = 
                }
            }
            setBoard([...currentBoard]);
        }
    }

    const revealAdjcent = (rowIndex, colIndex) => {
        if (!disableGame) {
            const lowerBound = 0;
            const upperBound = currentBoard[0].length;
            for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = colIndex - 1; j <= colIndex + 1; j++) {
                    if (i >= lowerBound && i < upperBound && j >= lowerBound && j < upperBound) {
                        const cell = currentBoard[i][j];
                        if (!cell.revealed) {
                            if (cell.value === 0) {
                                cell.revealed = true;
                                setNonMinesHidden(prev => prev - 1);
                                revealAdjcent(i, j);
                            }
                            else if (cell.value > 0 && cell.value <= 8) { // cell contain number
                                setNonMinesHidden(prev => prev - 1);
                                cell.revealed = true;
                            }
                            else { return }
                        }
                        if (cell.flag) {
                            cell.flag = false;
                        }
                    }
                }
            }
        }
    }

    const handleToggleFlag = (rowIndex, colIndex) => {
        if (!disableGame) {
            const cell = currentBoard[rowIndex][colIndex];
            if (!cell.flag) {
                cell.flag = true;
            }
            else {
                cell.flag = false;
            }
            setBoard([...currentBoard]);
        }
    }

    const revealsRemainingMines = (rowIndex, colIndex) => {
        currentGameObj.minesLocations.forEach((locMine) => {
            const cellMine = currentBoard[locMine.row][locMine.col];
            if (!cellMine.flag) {
                cellMine.revealed = true;
            }
        })
        currentBoard[rowIndex][colIndex].value = 11; // changes value to 11 to symbol that mine clicked
        setBoard([...currentBoard]);
    }

    return {
        currentGameObj,
        gameOver,
        handleToReveal,
        handleToggleFlag,
        // nonMinesHiddenCounter: currentNonMinesHidden,
        currentBoard,
        startNewGame
    }
}