import React from "react";

const Cell = (props) => {

    div.addEventListener("contextmenu", (e) => {e.preventDefault()});

    return (
        <div className={`cell ${props.cell.revealed ? 'revealed' : ''}`} key={props.key}
         onClick={handle} >
            {props.cell.value} 
        </div>
    )
}

export default Cell;
