import React from "react";
import './Cell.css';

const Cell = (props) => {

    const handleLeftClick = e => {
        if (props.enableGame){
            props.handleToReveal(props.boardGame, props.cell.row, props.cell.col);
        }
    }

    const handleRightClick = e => {
        if (props.enableGame){
            e.preventDefault();
            props.handleToggleFlag(props.boardGame, props.cell.row, props.cell.col);    
        }
    }

    return (
        // <div className={`cell_${props.cell.revealed ? 'revealed_'+props.cell.value : 'closed'}`} key={props.key}
        <div className={`cell_${(() => {
            if (props.cell.revealed){
                return 'revealed_'+props.cell.value
            }
            else if (props.cell.flag){
                return 'closed_flag'
            }
            return 'closed'
        })()}`} key={props.key}
         onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {(props.cell.revealed && props.cell.value < 10) ? (props.cell.value) : ''} 
        </div>
    )
}

export default Cell;
