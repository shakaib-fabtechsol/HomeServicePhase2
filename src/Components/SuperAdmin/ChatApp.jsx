import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { MdCircle } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";

const ChatApp = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Elmer Laverty",
      online: true,
      messages: [
        {
          id: 1,
          text: "Hey, how’s it going?",
          sender: "other",
          timestamp: "12m ago",
        },
        {
          id: 2,
          text: "Good, how about you?",
          sender: "self",
          timestamp: "10m ago",
        },
      ],
    },
    {
      id: 2,
      name: "Omar Dias",
      online: false,
      messages: [
        {
          id: 1,
          text: "Did you finish the project?",
          sender: "other",
          timestamp: "24m ago",
        },
        {
          id: 2,
          text: "Almost, just a few tweaks left.",
          sender: "self",
          timestamp: "22m ago",
        },
      ],
    },
    {
      id: 3,
      name: "Lavern Laboy",
      online: true,
      messages: [
        {
          id: 1,
          text: "Let's catch up soon!",
          sender: "other",
          timestamp: "1h ago",
        },
        {
          id: 2,
          text: "Yes, definitely!",
          sender: "self",
          timestamp: "50m ago",
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for file preview
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  const sendMessage = () => {
    if (input.trim() === "" && !file) return;
    const timestamp = "Just now";
    const newMessage = {
      id: activeChat.messages.length + 1,
      text: input,
      sender: "self",
      timestamp,
    };
    if (file) newMessage.file = file.name;

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );
    setChats(updatedChats);
    setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id));
    setInput("");
    setFile(null);
    setFilePreview(null); // Clear file preview after sending
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Generate a preview URL for the file
      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(selectedFile.name);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  return (
    <div className="flex h-[calc(100dvh-238px)] border rounded-xl w-full md:flex-row flex-col">
      <div className="w-full md:w-1/3 bg-transparnt p-4 border-r overflow-auto">
        <input
          type="text"
          placeholder="Search messages"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="space-y-2 w-full">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex w-full items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                activeChat.id === chat.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
              <div className="w-full">
                <p className="font-semibold">{chat.name}</p>
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm text-gray-500">
                    {chat.messages[chat.messages.length - 1].text}{" "}
                  </p>
                  <p className="text-sm text-gray-500">
                    {chat.messages[chat.messages.length - 1].timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
            <div>
              <p className="font-semibold">{activeChat.name}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <MdCircle
                  className={
                    activeChat.online
                      ? "text-green-500 me-2"
                      : "text-gray-400 me-2"
                  }
                  size={10}
                />
                {activeChat.online ? " Online" : " Offline"}
              </p>
            </div>
          </div>
          <CiCircleInfo className="text-3xl" />
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
                {msg.text}{" "}
                {msg.file && (
                  <a href="#" className="text-sm underline">
                    {msg.file}
                  </a>
                )}
                <p className="text-xs text-gray-500">{msg.timestamp}</p>
              </div>
              {msg.sender === "self" && (
                <div className="w-10 h-10 bg-gray-300 rounded-full ml-2"></div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-4 bg-transparent border-t flex flex-col">
          {/* File Preview */}
          {filePreview && (
            <div className="relative mb-2">
              {typeof filePreview === "string" && filePreview.startsWith("blob:") ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-w-[200px] max-h-[200px] rounded-lg"
                />
              ) : (
                <div className="p-2 bg-gray-200 rounded-lg">
                  <p className="text-sm">{filePreview}</p>
                </div>
              )}
              <button
                className="absolute top-0 right-0 p-1 bg-gray-600 rounded-full text-white"
                onClick={removeFile}
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" className="ml-2 p-2 cursor-pointer">
              <FiPaperclip size={20} />
            </label>
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded-full"
              onClick={sendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;