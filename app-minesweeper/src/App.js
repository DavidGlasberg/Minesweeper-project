import React, {useEffect,useState} from 'react';
import './App.css';
import Board from './comopnents/Board';
import { initialNewBoard } from './comopnents/LogicSide';

function App() {
  
  const [currentGameObj, setGameObj] = useState(initialNewBoard(9, 10));
  const [currentBoard, setBoard] = useState(currentGameObj.board);
  const [currentFlagsCounter, setFlagsCounter] = useState(0);
  const [nonMinesHiddenCounter, setNonMinesHiddenCounter] = useState(9*9-10); 
  const [enableGame, setEnableGame] = useState(true);
  const [gameOver, setGameOver] = useState(false);

    // useEffect(() => {
    //     createNewBoard();
    // },[])
    // const createNewBoard = () => {
    //     setBoard();
    // }

    const handleToReveal = (boardArr, rowIndex, colIndex) => {
      let newNonMinesCounter = nonMinesHiddenCounter;
      const cell = boardArr[rowIndex][colIndex];
      if (!cell.revealed && !gameOver && !cell.flag){
        
        if (cell.value == 10){ // is mine!
          setGameOver(true);
          g(boardArr, rowIndex, colIndex);
          return;
        }
        newNonMinesCounter--;
        cell.revealed = true;
        if (cell.value == 0){
          newNonMinesCounter = revealAdjcent(boardArr, rowIndex, colIndex, newNonMinesCounter); // board = 
        }
          // setNonMinesHiddenCounter(nonMinesHiddenCounter-1);
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
                // if (cell.flag){
                //   cell.flag = false;
                //   setFlagsCounter(currentFlagsCounter-1);
                // }
                // setNonMinesHiddenCounter(nonMinesHiddenCounter-1);
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
              setFlagsCounter(currentFlagsCounter-1);
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
        setFlagsCounter(currentFlagsCounter+1);
      }
      else{
        cell.flag = false;
        setFlagsCounter(currentFlagsCounter-1);
      }
      // setBoard([...boardArr]); 
    }
    const checkEndGame = () => {

      // all cells that contain numbers (0-8) revealed
      
    }

    const g = (boardArr, rowIndex, colIndex) => {
      currentGameObj.minesLocations.forEach((locMine) => {
        const cellMine = boardArr[locMine.row][locMine.col];
        if (!cellMine.flag){
          cellMine.revealed = true;
        }
      })
      boardArr[rowIndex][colIndex].value = 11; // change value to 11 to symbol that bomb he clicked
      setBoard([...boardArr]);
      setEnableGame(false);
    }


  return (
    <div className="App">
      <header className="App-header">
        <div>Minesweeper</div>
        <Board boardGame={currentBoard? currentBoard: {}} currentBoard={currentBoard} setBoard={setBoard} handleToReveal={handleToReveal} handleToggleFlag={handleToggleFlag} enableGame={enableGame} nonMinesHiddenCounter={nonMinesHiddenCounter} />
        {!currentBoard && <div>Loading board...</div>}
        <div>{`flags: ${currentFlagsCounter}`}</div>
        {/* <div>{`revealed: ${currentRevealedCounter}`}</div> */}

      </header>
    </div>
  );
}

export default App;
