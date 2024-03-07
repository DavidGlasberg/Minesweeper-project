import React, {useEffect,useState} from 'react';
import './App.css';
import Board from './comopnents/Board';
import { initialNewBoard } from './comopnents/LogicSide';
import GameOver from './comopnents/GameOver';
import Buttons from './comopnents/buttons';

function App() {
  
  const [currentGameObj, setGameObj] = useState(initialNewBoard(9, 10)); 
  const [currentBoard, setBoard] = useState(currentGameObj.board); 
  const [nonMinesHiddenCounter, setNonMinesHiddenCounter] = useState(null); 
  const [enableGame, setEnableGame] = useState(true);
  const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setBoard(currentGameObj.board);
        setNonMinesHiddenCounter(currentGameObj.size * currentGameObj.size - currentGameObj.mines)
        setEnableGame(true);
        setGameOver(false);
    },[currentGameObj])
  

    const handleToReveal = (boardArr, rowIndex, colIndex) => {
      let newNonMinesCounter = nonMinesHiddenCounter;
      const cell = boardArr[rowIndex][colIndex];
      if (!cell.revealed && !gameOver && !cell.flag){
        
        if (cell.value == 10){ // is mine!
          setGameOver(true);
          revealsRemainingMines(boardArr, rowIndex, colIndex);
          return;
        }
        newNonMinesCounter--;
        cell.revealed = true;
        if (cell.value == 0){
          newNonMinesCounter = revealAdjcent(boardArr, rowIndex, colIndex, newNonMinesCounter); // board = 
        }
      }
      setBoard([...boardArr]);
      setNonMinesHiddenCounter(newNonMinesCounter);
      
      return boardArr;
    }
  
  
    const revealAdjcent = (boardArr, rowIndex, colIndex, newNonMinesCounter) => {

      const lowerBound = 0;
      const upperBound = boardArr[0].length; 
      for (let i = rowIndex-1; i <= rowIndex+1; i++){
        for (let j = colIndex-1; j <= colIndex+1; j++){
          if (i >= lowerBound && i < upperBound && j >= lowerBound && j < upperBound){
            const cell = boardArr[i][j];
            if (!cell.revealed){
              if (cell.value === 0){ 
                newNonMinesCounter--;
                cell.revealed = true;
                newNonMinesCounter = revealAdjcent(boardArr, i, j, newNonMinesCounter);
              }
              else if (cell.value > 0 && cell.value <= 8){ // cell contain number
                newNonMinesCounter--;
                cell.revealed = true;
              }
              else{ return}
            }
            if (cell.flag){
              cell.flag = false;
            }
          }
        }
      }
      
      return newNonMinesCounter;
    }

    const handleToggleFlag = (boardArr, rowIndex, colIndex) => {
      const cell = boardArr[rowIndex][colIndex];
      if (!cell.flag){
        cell.flag = true;
      }
      else{
        cell.flag = false;
      }
      setBoard([...boardArr]); 
    }

    const revealsRemainingMines = (boardArr, rowIndex, colIndex) => {
      currentGameObj.minesLocations.forEach((locMine) => {
        const cellMine = boardArr[locMine.row][locMine.col];
        if (!cellMine.flag){
          cellMine.revealed = true;
        }
      })
      boardArr[rowIndex][colIndex].value = 11; // changes value to 11 to symbol that mine clicked
      setBoard([...boardArr]);
    }


  return (
    <div className="App">
      <header className="App-header"> Minesweeper
        <Buttons setGameObj={setGameObj} currentGameObj={currentGameObj} />
        {(nonMinesHiddenCounter==0 || gameOver) && <GameOver gameOver={gameOver} setEnableGame={setEnableGame}/>}
        <Board boardGame={currentBoard? currentBoard: {}} currentBoard={currentBoard} setBoard={setBoard} handleToReveal={handleToReveal} handleToggleFlag={handleToggleFlag} enableGame={enableGame} nonMinesHiddenCounter={nonMinesHiddenCounter} />
        {!currentBoard && <div>Loading board...</div>}
      </header>
    </div>
  )
}

export default App;
