import Cell from './Cell';
import './Board.css';

const Board = (props) => {


    let board = props.boardGame;
    if (Object.prototype.toString.call(board) == '[object Object]'){
        const updateBoard = [];
        for (let i = 0; i < 5; i++){
            updateBoard.push(board[i]);
        }
        board = updateBoard;
    }
    console.log('in row.map ==== ');
    console.log(board);


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