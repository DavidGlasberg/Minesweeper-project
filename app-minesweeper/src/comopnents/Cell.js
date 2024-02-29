import React from "react";
import './Cell.css';

const Cell = (props) => {

    const handleLeftClick = e => {
        console.log('handling left click for open cell');
        props.handleToReveal(props.boardGame, props.cell.row, props.cell.col);
    }

    const handleRightClick = e => {
        e.preventDefault();
        console.log('handling right click for Flag');
    }

    return (
        <div className={`cell_${props.cell.revealed ? 'revealed_'+props.cell.value : 'closed'}`} key={props.key}
         onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {props.cell.revealed ? props.cell.value : ''} 
        </div>
    )
}

export default Cell;
