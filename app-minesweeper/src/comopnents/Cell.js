import React from "react";
import './Cell.css';

const Cell = (props) => {

    const handleLeftClick = () => {
        props.handleToReveal(props.cell.row, props.cell.col);
    }

    const handleRightClick = e => {
        e.preventDefault();
        props.handleToggleFlag(props.cell.row, props.cell.col);
    }

    return (
        <div className={`cell_${(() => {
            if (props.cell.revealed) {
                return 'revealed_' + props.cell.value
            }
            else if (props.cell.flag && (props.cell.value < 10) && props.gameOver) {
                return 'closed_incorrect_flag'
            }
            else if (props.cell.flag) {
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
