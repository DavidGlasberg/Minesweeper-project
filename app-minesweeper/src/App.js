import React, {useEffect,useState} from 'react';
import './App.css';
import Board from './comopnents/Board';
import { initialNewBoard } from './comopnents/LogicSide';

function App() {
  
  const [currentBoard, setBoard] = useState(null);

    useEffect(() => {
        createNewBoard();
    },[])

    const createNewBoard = () => {
        setBoard(initialNewBoard(5, 10));
    }

    

  return (
    <div className="App">
      <header className="App-header">
        <div>Winesweeper</div>
        <Board boardGame={currentBoard? currentBoard: {
           size: 0,
           mines: 0,
           minesLocations: [],
           board: []
        } } />
        {!currentBoard && <div>Loading board...</div>}
      </header>
    </div>
  );
}

export default App;
