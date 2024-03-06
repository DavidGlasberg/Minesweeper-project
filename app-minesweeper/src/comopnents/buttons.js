import React from "react";
import { initialNewBoard } from "./LogicSide";
import './Buttons.css'

const Buttons = (props) => {
    return (
        <div className="control-buttons">
            <button id="reset" onClick={() => {
                props.setGameObj(initialNewBoard(props.currentGameObj.size, props.currentGameObj.mines))
            }}>Reset</button>
            <button id="beginners" onClick={() => {
                props.setGameObj(initialNewBoard(9,10))
            }}>Beginners</button>
            <button id="medium" onClick={() => {
                props.setGameObj(initialNewBoard(14,30))
            }}>Medium</button>
            <button id="hard" onClick={() => {
                props.setGameObj(initialNewBoard(18,45))
            }}>Hard</button>
        </div>
    )
}

export default Buttons;