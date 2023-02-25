// import { io, Socket } from "socket.io-client";
import ChatActivities from "../components/ChatActivities";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  return (
    <div className="chat-page-container">
      <ChatActivities />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
