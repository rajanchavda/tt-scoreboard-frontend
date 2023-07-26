import { getData, postData } from "./api-client";

export function getGame() {
  return getData("/game/getAll");
}

export function updateGame(gameId, data, params) {
  console.log(gameId, data, params);
  return postData(`/game/update/${gameId}`, data, { ...params });
}
