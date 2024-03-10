import Cell from './Cell';
import './Board.css';

const Board = (props) => {


    const board = props.boardGame;

    return (
        <div className='board'>
            {board.map((row, rowIndex) => {
                console.log('row it: ' + row + ' and rowIndex is: ' + rowIndex);
                return (
                    <div className='row' key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            console.log('cell it: ' + cell + ' and colIndex is: ' + colIndex);
                            return (<Cell key={`${rowIndex}-${colIndex}`} cell={cell} handleToReveal={props.handleToReveal} handleToggleFlag={props.handleToggleFlag} gameOver={props.gameOver} />);
                        })}
                    </div>)
            })}
        </div>
    )
}

export default Board;