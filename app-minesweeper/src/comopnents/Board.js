import Cell from './Cell';
import './Board.css';

const Board = (props) => {


    const board = props.boardGame;

    return (
        <div className='board'>
            {board.map((row, rowIndex) => {
                console.log('row it: '+ row + ' and rowIndex is: '+rowIndex);
                return (
                    <div className='row' key={rowIndex}>
                    {row.map((cell, colIndex) => {
                        console.log('cell it: '+ cell + ' and colIndex is: '+colIndex);
                        return (<Cell key={`${rowIndex}-${colIndex}`} cell={cell} boardGame={props.boardGame} currentBoard={props.currentBoard} setBoard={props.setBoard} handleToReveal={props.handleToReveal} />);
                    })}
                    </div>)
            })};
            Board
        </div>
    )
}

export default Board;