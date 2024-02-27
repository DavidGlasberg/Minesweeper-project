import React from "react";

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
        <div className={`cell ${props.cell.revealed ? 'revealed' : ''}`} key={props.key}
         onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {props.cell.revealed ? props.cell.value : ''} 
        </div>
    )
}

export default Cell;
