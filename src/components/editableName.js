import React, { useState } from "react";
import { updateGame } from "../APIs/games";

const EditableName = ({ initialName, playerIndex, gameId }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = (event) => {
    setIsEditing(true);
    event.stopPropagation();
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    let params = {
      player: playerIndex === 0 ? "player1" : "player2",
    };
    let data = {
      name: name,
    };
    updateGame(gameId, data, params).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="flex justify-center font-medium text-[3em] mb-4">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus // Focus the input field when editing starts
        />
      ) : (
        <p onDoubleClick={handleDoubleClick}>{name}</p>
      )}
    </div>
  );
};

export default EditableName;
