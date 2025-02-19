import React, { useEffect } from "react";

export default function Chatsa() {
  useEffect(() => {
    document.title = "Chat";
  }, []);
  return <div>Chat</div>;
}
