import React, {useEffect,useState} from 'react';
import './App.css';
import Board from './comopnents/Board';
import { initialNewBoard } from './comopnents/LogicSide';

function App() {
  
  const [currentGameObj, setGameObj] = useState(initialNewBoard(9, 10));
  const [currentBoard, setBoard] = useState(currentGameObj.board);
  const [currentFlagsCounter, setFlagsCounter] = useState(0);
  const [currentRevealedCounter, setRevealedCounter] = useState(0);

    // useEffect(() => {
    //     createNewBoard();
    // },[])
    // const createNewBoard = () => {
    //     setBoard();
    // }

    const handleToReveal = (boardArr, rowIndex, colIndex) => {
      const cell = boardArr[rowIndex][colIndex];
      
      if (!cell.revealed){
        // checkEndGame();
          cell.revealed = true;
          setRevealedCounter(currentRevealedCounter+1);
          if (cell.value == 0){
            revealAdjcent(boardArr, rowIndex, colIndex); // board = 
          }
          else if (cell.value == 10){
            gameOver(boardArr, rowIndex, colIndex);
          }
      }
      setBoard([...boardArr]);
      
      return boardArr;
    }
  
  
    const revealAdjcent = (boardArr, rowIndex, colIndex) => {

      const lowerBound = 0;
      const upperBound = boardArr[0].length; 
      for (let i = rowIndex-1; i <= rowIndex+1; i++){
        for (let j = colIndex-1; j <= colIndex+1; j++){
          if (i >= lowerBound && i < upperBound && j >= lowerBound && j < upperBound){
            const cell = boardArr[i][j];
            if (!cell.revealed){
              if (cell.value === 0){ 
                cell.revealed = true;
                // if (cell.flag){
                //   cell.flag = false;
                //   setFlagsCounter(currentFlagsCounter-1);
                // }
                setRevealedCounter(currentRevealedCounter+1);
                revealAdjcent(boardArr, i, j);
              }
              else if (cell.value > 0 && cell.value <= 8){ // cell contain number
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
      
      return boardArr;
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
      // all cells revealed
      // flags and other revealed
      // click on bomb!
      
    }

    const gameOver = (boardArr, rowIndex, colIndex) => {
      currentGameObj.minesLocations.forEach((locMine) => {
        const cellMine = boardArr[locMine.row][locMine.col];
        if (!cellMine.flag){
          cellMine.revealed = true;
        }
      })
      boardArr[rowIndex][colIndex].value = 11; // change value to 11 to symbol that bomb he clicked
      setBoard([...boardArr]);
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>Minesweeper</div>
        <Board boardGame={currentBoard? currentBoard: {}} currentBoard={currentBoard} setBoard={setBoard} handleToReveal={handleToReveal} handleToggleFlag={handleToggleFlag} />
        {!currentBoard && <div>Loading board...</div>}
        <div>{`flags: ${currentFlagsCounter}`}</div>
        <div>{`revealed: ${currentRevealedCounter}`}</div>

      </header>
    </div>
  );
}

export default App;
