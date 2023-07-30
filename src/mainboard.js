import React, { useEffect, useState } from "react";
import Scorecard from "./components/scorecard";
import { getGame } from "./APIs/games";
import { socket } from "./socket";
import Settings from "./components/Settings/settings";

function Mainboard() {

  const [playerData, setPlayerData] = useState([]);
  const [gameData, setGameData] = useState();

  useEffect(() => {

    const onSettingsUpdateEvent = (response) => {
      if (response) {
        const { event, payload } = response
        setGameData(prev => {
          return {
            ...prev,
            settings: payload
          }
        })
      }
    }

    const onGameUpdateEvent = (value) => {
      const { event, payload } = value
      setPlayerData([payload.player1, payload.player2])
    }

    getGame().then((response) => {
      setPlayerData([response[0].player1, response[0].player2]);
      setGameData(response[0]);
    });

    // Connect with socket
    // socket.connect();
    socket.on("GameUpdate", onGameUpdateEvent);
    socket.on("SettingsUpdate", onSettingsUpdateEvent);
    // socket.on("connect", onConnect);


    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      socket.off("GameUpdate", onGameUpdateEvent);
      socket.off("SettingsUpdate", onSettingsUpdateEvent);
    };
  }, []);


  return (
    <div id="mainboard">
      <Settings gameId={gameData?._id} settings={gameData?.settings} />
      <div>
        <p className="flex justify-center text-[2em] text-[red] mt-[-2em] mb-4">
          Live
        </p>
        <div className="w-screen flex justify-around items-center">
          {playerData.map((player, index) => (
            <div key={index}>
              <Scorecard
                playerIndex={index}
                playerName={player.name}
                score={player.score}
                // set={player.set}
                bgColor={index % 2 ? "bg-red-500" : "bg-blue-500"}
                row={index % 2}
                gameId={gameData?._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mainboard;
