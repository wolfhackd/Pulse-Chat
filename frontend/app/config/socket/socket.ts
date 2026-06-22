import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL,{
    autoConnect: false,
    // auth: {
    //     token: window.localStorage.getItem("token")
    // }
});


export const connectSocket = () => {
  socket.auth = {
    token: localStorage.getItem("token"),
  };

  socket.connect();
};  