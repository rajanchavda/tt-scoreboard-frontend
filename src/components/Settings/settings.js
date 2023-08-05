import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./settings.css";
import { updateSettings } from "../../APIs/games";
import Login from "../Login/login";

export const GAME_TYPES = {
  SINGLES: "SINGLES",
  DOUBLES: "DOUBLES",
};

const defaultSettings = {
  gameType: "",
  winPoints: {
    singles: 0,
    doubles: 0,
  },
};

const customStyles = {
  content: {
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    border: "2px solid black",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
};

const Settings = ({ settings, gameId }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedSettings, setUpdatedSettings] = useState(defaultSettings);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.length > 10) {
      setIsLoggedIn(true);
    }
  }, []);

  const onSettingUpdate = (key, value) => {
    setUpdatedSettings({
      ...updatedSettings,
      [key]: value,
    });
  };

  const callUpdateSettings = () => {
    // API call to update settings
    updateSettings(gameId, updatedSettings).then((res) => {
      closeModal();
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setUpdatedSettings(settings);
  }, [settings, setUpdatedSettings]);

  return (
    <>
      <div id="settings">
        <div
          className="absolute right-[20px] top-[20px] w-[20px] h-[20px] cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img src="images/setting-icon.svg" />
        </div>

        <Modal
          isOpen={showModal}
          style={customStyles}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
        >
          <div className="flex justify-end cursor-pointer" onClick={closeModal}>
            X
          </div>
          {isLoggedIn ? (
            <>
              <div className="p-[20px] flex-grow">
                <ul className="ul">
                  <li className="mb-[20px] flex items-center">
                    <span className="mr-[30px] text-[20px]">Game Type</span>
                    <select
                      className="p-[10px]"
                      value={updatedSettings?.gameType}
                      onChange={($event) =>
                        onSettingUpdate("gameType", $event.target.value)
                      }
                    >
                      {/* <option value='default' disabled>Select</option>  */}
                      <option value={GAME_TYPES.SINGLES}>Singles</option>
                      <option value={GAME_TYPES.DOUBLES}>Doubles</option>
                    </select>
                  </li>

                  <li className="mb-[20px] flex items-center">
                    <span className="mr-[30px] text-[20px]">Win Points</span>
                    <div className="p-[10px] flex">
                      <div className="flex mr-[10px] items-center">
                        <span className="mr-[10px]">Singles</span>
                        <input
                          className="w-[62px] h-[30px] p-[10px] border border-[grey]"
                          type="number"
                          value={updatedSettings?.winPoints?.singles}
                          onChange={($event) => {
                            onSettingUpdate("winPoints", {
                              ...updatedSettings?.winPoints,
                              singles: Number($event.target.value),
                            });
                          }}
                        />
                      </div>

                      <div className="flex mr-[10px] items-center">
                        <span className="mr-[10px]">Doubles</span>
                        <input
                          className="w-[62px] h-[30px] p-[10px] border border-[grey]"
                          type="number"
                          value={updatedSettings?.winPoints?.doubles}
                          onChange={($event) =>
                            onSettingUpdate("winPoints", {
                              ...updatedSettings?.winPoints,
                              doubles: Number($event.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={callUpdateSettings}
                  className="border border-blue-700 p-[10px] bg-[blue] text-[white] w-[100px] rounded-[6px]"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Settings;
