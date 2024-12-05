import { io } from "socket.io-client";

let userID = localStorage.getItem("userID");
if (!userID) {
  userID = `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
  localStorage.setItem("userID", userID);
}

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000", {
  autoConnect: false,
  auth: { userID },
  withCredentials: true,
});

export default socket;
