import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatApp = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Elmer Laverty",
      messages: [
        { id: 1, text: "Hey, how’s it going?", sender: "other" },
        { id: 2, text: "Good, how about you?", sender: "self" },
      ],
    },
    {
      id: 2,
      name: "Omar Dias",
      messages: [
        { id: 1, text: "Did you finish the project?", sender: "other" },
        { id: 2, text: "Almost, just a few tweaks left.", sender: "self" },
      ],
    },
    {
      id: 3,
      name: "Lavern Laboy",
      messages: [
        { id: 1, text: "Let's catch up soon!", sender: "other" },
        { id: 2, text: "Yes, definitely!", sender: "self" },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              { id: chat.messages.length + 1, text: input, sender: "self" },
            ],
          }
        : chat
    );
    setChats(updatedChats);
    setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
    setInput("");
  };

  return (
    <div className="flex h-[calc(100dvh-238px)] w-full md:flex-row flex-col border rounded-lg">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-transparent p-4 border-r overflow-auto">
        <input
          type="text"
          placeholder="Search messages"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                activeChat.id === chat.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
              <div>
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500">
                  {chat.messages[chat.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
          <p className="font-semibold">{activeChat.name}</p>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "self" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              {msg.sender === "other" && (
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
              )}
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "self"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "self" && (
                <div className="w-10 h-10 bg-gray-300 rounded-full ml-2"></div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-full"
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
