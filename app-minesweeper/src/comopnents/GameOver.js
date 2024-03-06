import React from "react";

const GameOver = (props) => {


    return (
        <div className="game-over">
            {`${(() => {
                {props.setEnableGame(false)}
                if (props.gameOver){
                    return 'Ooops! GAME-OVER!'
                }
                return 'You Winner!'
            })()}`}
        </div>
    )
}

export default GameOver;