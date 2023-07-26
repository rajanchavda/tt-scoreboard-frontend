import React, { useEffect, useState } from "react";
import Scorecard from "./components/scorecard";
import { getGame } from "./APIs/games";

function Mainboard() {
  const [playerData, setPlayerData] = useState([]);
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    getGame().then((response) => {
      setPlayerData([response[0].player1, response[0].player2]);
      setGameId(response[0]._id);
      console.log(response[0]);
    });
  }, []);

  return (
    <div>
      <p className="flex justify-center text-[2em] text-[red] mt-[-2em] mb-4">
        Live
      </p>
      <div className="w-screen flex justify-around items-center">
        {playerData.map((player, index) => (
          <div>
            <Scorecard
              playerIndex={index}
              playerName={player.name}
              score={player.score}
              // set={player.set}
              bgColor={index % 2 ? "bg-red-500" : "bg-blue-500"}
              row={index % 2}
              gameId={gameId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mainboard;
