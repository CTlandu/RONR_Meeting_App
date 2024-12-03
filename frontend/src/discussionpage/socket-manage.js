import { io } from "socket.io-client";

let userID = localStorage.getItem("userID");
if (!userID) {
  userID = `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
  localStorage.setItem("userID", userID);
}

const socket = io("http://localhost:3000", {
  autoConnect: false,
  auth: { userID },
});

export default socket;
