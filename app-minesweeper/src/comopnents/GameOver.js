import React from "react";

const GameOver = (props) => {

    // const messages = {
    //     gameover: 'GAME-OVER!',
    //     succses: "You Win!"
    // }
    return (
        <div className="game-over">
            { props.gameOver ? 'Game-Over! You lose' : 'You Win!' }
        </div>
    )
}

export default GameOver;