import './App.css';
import Board from './comopnents/Board';
import GameOver from './comopnents/GameOver';
import ControlButtons from './comopnents/ControlButtons';
import { useGameFlow } from './hooks/useGameFlow';

function App() {

  const { currentGameObj,currentBoard, gameOver, handleToReveal, handleToggleFlag, startNewGame} = useGameFlow();

  return (
    <div className="App" key={currentGameObj.size}>
      <header className="App-header"> Minesweeper
        <ControlButtons currentGameObj={currentGameObj} startNewGame={startNewGame} />
        {(gameOver) && <GameOver gameOver={gameOver}  />}
        <Board boardGame={currentBoard ? currentBoard : {}} currentBoard={currentBoard} handleToReveal={handleToReveal} handleToggleFlag={handleToggleFlag} gameOver={gameOver} />
        {!currentBoard && <div>Loading board...</div>}
      </header>
    </div>
  )
}

export default App;

