import React from "react";
import './ControlButtons.css'

const ControlButtons = (props) => {
    return (
        <div className="control-buttons">
            <button id="reset" onClick={() => {
                // props.setGameObj(initialNewBoard(props.currentGameObj.size, props.currentGameObj.mines))
                props.startNewGame(props.currentGameObj.size, props.currentGameObj.mines)
            }}>Reset</button>
            <button id="beginners" onClick={() => {
                props.startNewGame(9,10)
            }}>Beginners</button>
            <button id="medium" onClick={() => {
                props.startNewGame(14,30)
            }}>Medium</button>
            <button id="hard" onClick={() => {
                props.startNewGame(18,45)
            }}>Hard</button>
        </div>
    )
}

export default ControlButtons;