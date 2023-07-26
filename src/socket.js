import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://cccb-103-111-109-133.ngrok-free.app";

export const socket = io(URL);
