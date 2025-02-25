import React, { useState, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaPaperclip } from 'react-icons/fa';
import { IoCloseCircle, IoPaperPlaneOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ClientTwo from '../../assets/img/client2.png';

const ChatApp = () => {
    // Sidebar chats data
    const initialChats = [
        {
            id: 1,
            name: 'James Hall',
            lastMessage: 'Lorem ipsum dolor sit amet',
            time: 'Now',
            online: true,
        },
        {
            id: 2,
            name: 'Phoenix Baker',
            lastMessage: 'Consectetur adipiscing elit',
            time: '1hr ago',
            online: false,
        },
    ];

    const [chats, setChats] = useState(initialChats);
    const [activeChat, setActiveChat] = useState(initialChats[0].id);

    const [messages, setMessages] = useState([
        {
            text: 'Mauris vel metus ac.',
            sender: 'Phoenix Baker',
            time: 'Friday 2:20pm',
            isUser: false,
            file: null,
        },
        {
            text: 'Mauris vel metus ac.',
            sender: 'You',
            time: 'Friday 2:20pm',
            isUser: true,
            file: null,
        },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [attachedFile, setAttachedFile] = useState(null);
    // State to control chat area on small screens
    const [open, setOpen] = useState(false);

    const fileInputRef = useRef();

    const handleSendMessage = () => {
        if (newMessage.trim() || attachedFile) {
            const message = {
                text: newMessage,
                sender: 'You',
                time: new Date().toLocaleTimeString(),
                isUser: true,
                file: attachedFile,
            };

            setMessages([...messages, message]);
            setNewMessage('');
            setAttachedFile(null);
            setFilePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setAttachedFile(selectedFile);

            if (selectedFile.type.startsWith('image/')) {
                setFilePreview(URL.createObjectURL(selectedFile));
            } else if (selectedFile.type === 'application/pdf') {
                setFilePreview(' '); // Replace with your PDF icon or logic
            } else if (selectedFile.type.includes('word')) {
                setFilePreview(' ');
            } else {
                setFilePreview(' ');
            }
        }
    };

    return (
        <div className="lg:flex relative">
            {/* Sidebar */}
            <div className="w-full lg:max-w-[250px] border h-[calc(100dvh-240px)]">
                <div className="p-2">
                    <div className="flex items-center p-2 border rounded-lg w-full">
                        <label>
                            <CiSearch className="text-[#717680] text-xl" />
                        </label>
                        <input type="search" placeholder="Search" className="w-full px-2" />
                    </div>
                </div>
                <div>
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => {
                                setActiveChat(chat.id);
                                // On small screens, open chat area when a chat is selected.
                                setOpen(true);
                            }}
                            className={`flex justify-between gap-2 border-b p-2 cursor-pointer ${activeChat === chat.id ? 'bg-blue-100' : ''
                                }`}
                        >
                            <div className="flex gap-2 items-center relative">
                                <div className="relative">
                                    <img
                                        src={ClientTwo}
                                        alt=""
                                        className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                                    />
                                    {/* Green dot if online */}
                                    {chat.online && (
                                        <span className="absolute sm:bottom-0 -bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm text-[#181D27] font-semibold">{chat.name}</h4>
                                    <p className="text-[#535862] text-xs truncate">{chat.lastMessage}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[8px] text-[#181D27] whitespace-nowrap">{chat.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            <div
                className={`
          lg:flex lg:w-[calc(100%-250px)] w-full border h-[calc(100dvh-240px)] flex-col justify-between lg:static absolute top-0 bg-white
          ${open ? 'block' : 'hidden'}
        `}
            >
                {/* Back button for small screens */}
                <div>
                    <div className="flex justify-between gap-2 items-center border-b p-2">
                        <div className="flex gap-2 items-center relative">
                            <div className="relative">
                                <img
                                    src={ClientTwo}
                                    alt=""
                                    className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                                />
                                {chats.find((chat) => chat.id === activeChat)?.online && (
                                    <span className="absolute sm:bottom-0 -bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-base text-[#181D27]">
                                    {chats.find((chat) => chat.id === activeChat)?.name}
                                </h4>
                                <p className="text-[#535862] text-xs">
                                    {chats.find((chat) => chat.id === activeChat)?.online ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BsThreeDotsVertical />
                            <div className="lg:hidden">
                                <button onClick={() => setOpen(false)} className="text-red-500">
                                    <IoCloseCircle className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 h-[calc(100dvh-360px)] overflow-y-auto">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 mb-3 ${message.isUser ? 'justify-end' : ''}`}
                            >
                                <img
                                    src={ClientTwo}
                                    alt=""
                                    className={`rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover ${message.isUser ? 'hidden' : ''
                                        }`}
                                />
                                <div className="max-w-[80%] sm:max-w-[60%] lg:max-w-[45%] w-full">
                                    <div className="flex justify-between">
                                        <h6
                                            className={`font-medium ${message.isUser ? 'text-[#414651]' : 'text-[#181D27]'
                                                } sm:text-sm text-xs`}
                                        >
                                            {message.sender}
                                        </h6>
                                        <p className="text-[#535862] text-xs">{message.time}</p>
                                    </div>
                                    <div
                                        className={`p-4 rounded-xl mt-2 ${message.isUser ? 'bg-[#535862]' : 'bg-[#F5F5F5]'
                                            }`}
                                    >
                                        {message.text && (
                                            <p
                                                className={`${message.isUser ? 'text-white' : 'text-black'
                                                    } sm:text-base text-xs`}
                                            >
                                                {message.text}
                                            </p>
                                        )}
                                        {/* Render file preview if available */}
                                        {message.file && (
                                            <div className="mt-2">
                                                {message.file.type.startsWith('image/') ? (
                                                    <img
                                                        src={URL.createObjectURL(message.file)}
                                                        alt={message.file.name}
                                                        className="max-w-[200px] rounded"
                                                    />
                                                ) : (
                                                    <a
                                                        href={URL.createObjectURL(message.file)}
                                                        download={message.file.name}
                                                        className="text-sm text-white underline"
                                                    >
                                                        {message.file.name}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-2 border-t relative">
                    {/* File preview section */}
                    {filePreview && (
                        <div className="flex items-center gap-2 p-2 border rounded-lg absolute bottom-16 bg-white">
                            <div>
                                {filePreview ? (
                                    <img
                                        src={filePreview}
                                        alt=""
                                        className="max-w-[100px] rounded"
                                    />
                                ) : (
                                    <div className="w-[100px] h-[100px] bg-gray-200 flex justify-center items-center rounded">
                                        <p className="text-xs text-center">{file?.name || 'File attached'}</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">
                                    {file?.name || 'File attached'}
                                </p>
                            </div>
                            <button
                                className="text-red-500 text-xs"
                                onClick={() => {
                                    setFile(null);
                                    setFilePreview(null);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = null;
                                    }
                                }}
                            >
                                <IoCloseCircle className="text-lg" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <div className="border rounded-xl flex justify-between gap-2 px-3 items-center w-full">
                            <input
                                type="text"
                                className="w-full rounded-xl bg-transparent p-2"
                                placeholder="Message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <label htmlFor="fil">
                                <FaPaperclip className="cursor-pointer" />
                            </label>
                            <input
                                type="file"
                                id="fil"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div>
                            <button
                                className="bg-[#0F91D2] text-white text-xl py-3 2xl:px-6 px-3 shadow-lg rounded-md"
                                onClick={handleSendMessage}
                            >
                                <IoPaperPlaneOutline />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
