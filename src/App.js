import "./App.css";
import Mainboard from "./mainboard";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenRef = useRef(null);


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

    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);
    // socket.on("GameUpdate", onFooEvent);

    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.off("GameUpdate", onFooEvent);
    };
  }, []);

  const toggleFullScreen = () => {
    const elem = fullScreenRef.current;

    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      ref={fullScreenRef}
      style={{ width: "100vw", height: "100vh" }}
      onDoubleClick={toggleFullScreen}
      className="bg-white flex items-center justify-center"
    >
      <Mainboard />
    </div>
  );
}

export default App;
