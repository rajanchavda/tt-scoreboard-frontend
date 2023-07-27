import React, { useState } from "react";
import EditableName from "./editableName";
import { updateGame } from "../APIs/games";

function Scorecard({
  score,
  set,
  bgColor,
  playerName,
  row,
  gameId,
  playerIndex,
}) {
  // const [playerScore, setPlayerScore] = useState(score);
  const handleLeftClick = () => {
    // setPlayerScore((prev) => prev + 1);
    let params = {
      player: playerIndex === 0 ? "player1" : "player2",
    };
    let data = {
      score: score + 1,
    };
    updateGame(gameId, data, params).then((res) => {
      console.log(res);
    });
  };
  const handleRightClick = (event) => {
    event.preventDefault();
    // setPlayerScore((prev) => prev - 1);
    let params = {
      player: playerIndex === 0 ? "player1" : "player2",
    };
    let data = {
      score: score - 1,
    };
    updateGame(gameId, data, params).then((res) => {
      console.log(res);
    });
  };

  const divStyle = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div>
      <EditableName
        initialName={playerName}
        playerIndex={playerIndex}
        gameId={gameId}
      />
      <div style={divStyle} className={`flex ${row ? "flex-row-reverse" : ""}`}>
        <div
          onClick={handleLeftClick}
          onContextMenu={handleRightClick}
          className={`${bgColor} flex justify-center items-center p-4 box-content h-96 w-96 rounded-lg shadow-lg`}
        >
          <p className="text-[16em] text-white font-[600]">{score}</p>
        </div>
        {/* <div
          className={`${bgColor} flex justify-center items-center ${
            row ? "mr-[1em]" : "ml-[1em]"
          } p-4 box-content h-32 w-32 rounded-lg shadow-lg`}
        >
          <p className="text-[6em] text-white font-[600]">{set}</p>
        </div> */}
      </div>
    </div>
  );
}

export default Scorecard;
