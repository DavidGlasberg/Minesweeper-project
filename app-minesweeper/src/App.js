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
          cell.revealed = true;
          setRevealedCounter(currentRevealedCounter+1);
          switch(cell.value){
              case 0:
                revealAdjcent(boardArr, rowIndex, colIndex); // board = 
                  break;
              case 10:
                console.log("game over!"); // To-Do notifier for end the game
                  break;
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
                setRevealedCounter(currentRevealedCounter+1);
                revealAdjcent(boardArr, i, j);
              }
              else if (cell.value > 0 && cell.value <= 8){ // cell contain number
              cell.revealed = true;
              }
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

    

  return (
    <div className="App">
      <header className="App-header">
        <div>Minesweeper</div>
        <Board boardGame={currentBoard? currentBoard: {}} currentBoard={currentBoard} setBoard={setBoard} handleToReveal={handleToReveal} handleToggleFlag={handleToggleFlag} />
        {!currentBoard && <div>Loading board...</div>}
      </header>
    </div>
  );
}

export default App;
