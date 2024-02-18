import React, { useState, useEffect} from 'react'
import { initialNewBoard } from './LogicSide';

function Board(props) {

    // cosnt [board, setBoard] = useState([]);

    useEffect(() => {
        createNewBoard();
    },[])

    const createNewBoard = () => {
        initialNewBoard(5, 10);
    }

    return (
        <div>
            Board
        </div>
    )
}

export default Board;