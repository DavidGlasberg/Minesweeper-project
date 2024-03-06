import React from "react";
import { initialNewBoard } from "./LogicSide";

const Buttons = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.setGameObj(initialNewBoard(props.currentGameObj.size, props.currentGameObj.mines))
            }}>Reset</button>
            <button onClick={() => {
                props.setGameObj(initialNewBoard(9,10))
            }}>Beginners</button>
            <button onClick={() => {
                props.setGameObj(initialNewBoard(14,30))
            }}>Medium</button>
            <button onClick={() => {
                props.setGameObj(initialNewBoard(18,45))
            }}>Hardee</button>

        </div>
    )
}

export default Buttons;