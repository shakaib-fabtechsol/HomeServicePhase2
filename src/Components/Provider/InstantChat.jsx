import React from "react";
import ChatApp from "../SuperAdmin/ChatApp";
import ConversationHeader from "./ConversationHeader";

function InstantChat() {
  return (
    <div>
      <ConversationHeader
        title="Instant Chat"
        subtitle="Manage and Respond to Messages Seamlessly"
        comName="chat"
      />
      <div className="mt-5">
        <ChatApp />
      </div>
    </div>
  );
}

export default InstantChat;
