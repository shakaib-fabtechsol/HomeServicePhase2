import { io } from "socket.io-client";
import { socketUrl } from "../../../config";
export const sendInstantChatMessage = async (data) => {
  const {  text,  providerId , userId } = data;
  console.log("came into sendInstantChatMessage")
  console.log(data)
  console.log(socketUrl)
  try {
      
  return new Promise((resolve, reject) => {
    const socket = io(socketUrl, {
      // transports: ["websocket"], 
      extraHeaders: {
        user_id: userId,
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("send-message", { receiverId :providerId, content :text, contentType :"text" });

      setTimeout(() => {
        console.log("Message sent. Disconnecting...");
        socket.disconnect();
        resolve("Message sent and socket disconnected.");
      }, 1000); 
    });
    socket.on("receive-message", (data) => {
      console.log("receive-message:", data);
    });
    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
    socket.on("socket-error", (err) => {
      console.error("Socket connection error:", err);
      reject("Socket connection failed.");
    });
  });
} catch (error) {
    throw new Error(error);
}
};

