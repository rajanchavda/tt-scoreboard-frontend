import "./App.css";
import Mainboard from "./mainboard";
import React, { useEffect } from "react";
import { socket } from "./socket";

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // function onConnect() {
    //   // setIsConnected(true);
    // }

    // function onDisconnect() {
    //   setIsConnected(false);
    // }

    // function onFooEvent(value) {
    //   console.log('test',value);
    // }

    socket.connect();

    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);
    // socket.on("GameUpdate", onFooEvent);

    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.off("GameUpdate", onFooEvent);
    };
  }, []);


  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="bg-white flex items-center justify-center"
    >
      <Mainboard />
    </div>
  );
}

export default App;
