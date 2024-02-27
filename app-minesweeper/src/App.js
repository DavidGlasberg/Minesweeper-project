import React, {useEffect,useState} from 'react';
import './App.css';
import Board from './comopnents/Board';
import { initialNewBoard } from './comopnents/LogicSide';

function App() {
  
  const [currentGameObj, setGameObj] = useState(initialNewBoard(5, 10));
  const [currentBoard, setBoard] = useState(currentGameObj.board);

    // useEffect(() => {
    //     createNewBoard();
    // },[])
    // const createNewBoard = () => {
    //     setBoard();
    // }

    const handleToReveal = (board, rowIndex, colIndex) => {
      console.log(boardObj)
      const boardObj = currentBoard;
      const cell = boardObj[rowIndex][colIndex];
      console.log('clicked value - ' + cell.value);
      if (!cell.revealed){
          cell.revealed = true;
          switch(cell.value){
              case 0:
                boardObj = revealAdjcent(boardObj, rowIndex, colIndex);
                  break;
              case 10:
                  console.log("game over!"); // To-Do notifier for end the game
                  break;
          }
      }
      setBoard(...boardObj);
      return boardObj;
    }
  
  
    const revealAdjcent = (boardObj, rowIndex, colIndex) => {
      console.log(`enter to revAdj with (${rowIndex+' '+colIndex})`);
      const lowerBound = 0;
      const upperBound = boardObj[0].length; 
      for (let i = rowIndex-1; i <= rowIndex+1; i++){
        for (let j = colIndex-1; j <= colIndex+1; j++){
          if (i >= lowerBound && i < upperBound && j >= lowerBound && j < upperBound){
            const cell = boardObj[i][j];
            if (!cell.revealed){
              if (cell.value === 0){ 
                cell.revealed = true;
                revealAdjcent(boardObj, i, j);
              }
              else if (cell.value > 0 && cell.value <= 8){ // cell contain number
              cell.revealed = true;
              }
            }
          }
        }
      }
      return boardObj;
    }

    

  return (
    <div className="App">
      <header className="App-header">
        <div>Winesweeper</div>
        <Board boardGame={currentBoard? currentBoard: []} currentBoard={currentBoard} setBoard={setBoard} handleToReveal={handleToReveal} />
        {!currentBoard && <div>Loading board...</div>}
      </header>
    </div>
  );
}

export default App;
