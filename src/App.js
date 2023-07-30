import "./App.css";
import Mainboard from "./mainboard";
import React, { useEffect } from "react";
import { socket } from "./socket";
import ReactModal from "react-modal";

ReactModal.setAppElement('#root');

function App() {

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="bg-white flex items-center justify-center"
    >
      <Mainboard/>
    </div>
  );
}

export default App;
