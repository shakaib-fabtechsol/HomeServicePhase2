import React, { useEffect } from "react";

export default function Chatsa() {
  useEffect(() => {
    document.title = "Chat";
  }, []);
  return (
    <div>
      <div className="mb-2">
        <h2 className="font-semibold text-3xl">Chats</h2>
        <p className="text-gray-600">
          Track and manage your favorite services.
        </p>
      </div>
    </div>
  );
}
