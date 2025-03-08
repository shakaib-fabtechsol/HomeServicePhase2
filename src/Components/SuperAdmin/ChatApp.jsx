import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPaperclip } from "react-icons/fa";
import { IoCloseCircle, IoPaperPlaneOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import ClientTwo from "../../assets/img/client2.png";
import hand from "../../assets/img/handicon.png";
import { HiCalendar } from "react-icons/hi2";
import io from "socket.io-client";
import { BASE_URL, socketUrl } from "../../../config";
import { useSelector } from "react-redux";
import logo from "../../assets/img/logo.png";
import { OfferModal } from "./OfferModal";
import { useCreateOfferMutation } from "../../services/order";
import Swal from "sweetalert2";

// const socket = io(socketUrl); // Replace with your socket server URL
const ChatApp = () => {
  const [createOffer, { isLoading, isSuccess }] = useCreateOfferMutation()
  const [modalopen, setmodalOpen] = React.useState(false);
  const handleOpen = () => setmodalOpen(true);
  const handleClose = () => setmodalOpen(false);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef();
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const activeChatRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((state) => state.auth)
  console.log("chats =>>>>>>>>>", chats)
  console.log("messages =>>>>>>>>>", messages)
  console.log("activeChat =>>>>>>>>>", activeChat)
  useEffect(() => {
    if (!socket.current) {
      socket.current = io(socketUrl, {
        // transports: ["websocket"],
        secure: false,
        rejectUnauthorized: false,
        extraHeaders: {
          user_id: user?.id,
        },
      });

      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current.id);
      });

      socket.current.on("user-chats", (data) => {
        console.log("user-chats received", data);
        setChats(data.chats);
        setFilteredChats(data.chats);
      });

      socket.current.on("receive-message", (message) => {
        console.log("receive-message:", message);
        console.log(" activeChat rin:", activeChatRef.current);
        console.log("activeChat", message.message.chat === activeChatRef.current);
        if (chats.some(chat => chat.chatId !== message.message.chat)) {
          console.log(" again fetch-user-chats .........")
          socket.current.emit("fetch-user-chats");
          return
        }
        if (message.message.chat === activeChatRef.current) {
          console.log("activeChat :", activeChatRef.current);
          setMessages((prevMessages) => [...prevMessages, message.message]);
        }
      });

      socket.current.on("socket-error", (error) => {
        console.error("Socket error:", error);
      });
      socket.current.emit("fetch-user-chats");
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [user?.id]);

  useEffect(() => {
    console.log("fetch-chat-messages aaa")
    console.log(activeChatRef.current, socket.current)
    if (activeChatRef.current && socket.current) {
      console.log("came into")

      socket.current.emit("fetch-user-chat-messages", { chatId: activeChatRef.current });

      const messageListener = (data) => {
        console.log("fetch-chat-messages", data)
        setMessages(data?.messages);


        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      };

      socket.current.on("user-chat-messages", messageListener);

      return () => {
        // socket.current.off("user-chat-messages", messageListener);
      };
    }
  }, [activeChatRef.current]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const handleSendMessage = () => {
    if (newMessage.trim() || attachedFile) {
      console.log("send-message",)
      socket.current.emit("send-message", {
        chatId: activeChatRef.current,
        content: newMessage,
        contentType: "text",
      });

      // setMessages([...messages, message]);
      setNewMessage("");
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

      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type === "application/pdf") {
        setFilePreview(" "); // Replace with your PDF icon or logic
      } else if (selectedFile.type.includes("word")) {
        setFilePreview(" ");
      } else {
        setFilePreview(" ");
      }
    }
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredChats(chats);
    } else {
      setFilteredChats(
        chats.filter(chat =>
          chat?.receiver?.name?.toLowerCase().includes(query)
        )
      );
    }
  };
  const currentCustomer = (chatId, userId) => {
    const customerId = chats.find(chat => chat.chatId === chatId).
      participants
      .find(participant => participant.id !== userId)?.id;
    return customerId
  }

  const onSubmit = async (data) => {
    try {


      console.log("data", data)

      const orderDetails = {
        provider_id: user?.id,
        customer_id: currentCustomer(activeChatRef.current, user?.id),
        total_amount: data?.price,
        deal_id: data?.service,
        notes: data?.description,
        scheduleDate: data?.date,
      };
      const formData = new FormData();
      Object.entries(orderDetails).forEach(([key, value]) => {
        formData.append(key, value);
      })
      const order = await createOffer(formData)
      console.log("order", order)


      if (order?.data?.Offer) {

        socket.current.emit("send-message", {
          chatId: activeChatRef.current,
          contentType: "order",
          content: order?.data?.Offer?.notes,
          orderId: order?.data?.Offer?.id,
        });
        // reset();
        handleClose();
        Swal.fire({
          icon: "success",
          title: `Offer created successfully`,
        });

      }
    } catch (error) {
      console.log("error", error)
      handleClose();

      Swal.fire({
        icon: "error",
        title: `failed to create offer`,
      });
    } finally {
      handleClose();

    }
  };

  return (<>
    <div className="lg:flex relative">
      {/* Sidebar */}
      <div className="w-full lg:max-w-[250px] border h-[calc(100dvh-240px)]">
        <div className="p-2">
          <div className="flex items-center p-2 border rounded-lg w-full">
            <label>
              <CiSearch className="text-[#717680] text-xl" />
            </label>
            <input type="search" placeholder="Search" className="w-full px-2"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div>
          {Array.isArray(filteredChats) && filteredChats.map((chat) => (
            <div
              key={chat.chatId}
              onClick={() => {
                setActiveChat(chat.chatId);
                activeChatRef.current = chat.chatId
                // setOpen(true);
              }}
              className={`flex justify-start gap-2 border-b p-2 cursor-pointer ${activeChatRef.current === chat.chatId ? "bg-blue-100" : ""
                }`}
            >
              <div className="flex items-center justify-start ">
                <div className=" ">
                  <img
                    src={chat?.receiver?.personal_image ? `${BASE_URL}/uploads/${chat?.receiver?.personal_image}` : ClientTwo}
                    alt=""
                    className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                  />
                  {chat?.receiver?.isOnline && (
                    <span className="absolute sm:bottom-0 -bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className=" flex items-center justify-between w-full">
                  <h4 className="text-sm text-[#181D27] font-semibold">
                    {chat?.receiver?.name}
                  </h4>
                  <p className="text-[8px] text-[#181D27] whitespace-nowrap ">
                    {new Date(chat.latestMessageSentAt).toLocaleTimeString()}
                  </p>

                </div>
                <div className=" w-full">
                  <p className="text-[#535862] text-xs truncate">
                    {chat?.latestMessage?.slice(0, 20)} {chat?.latestMessage?.length > 20 ? "..." : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeChat ? (
        <div
          className={`lg:flex lg:w-[calc(100%-250px)] w-full border h-[calc(100dvh-240px)] flex-col justify-between lg:static absolute top-0 bg-white ${open ? "block" : "hidden"
            }`}
        >
          <div>
            <div className="flex justify-between gap-2 items-center border-b p-2">

              <div className="flex gap-2 items-center relative">
                <div className="relative">
                  <img
                    src={`${BASE_URL}/uploads/${chats.find((chat) => chat.chatId === activeChat)?.receiver?.personal_image}` || ClientTwo}
                    alt=""
                    className="rounded-full sm:size-9 sm:max-w-9 size-6 max-w-[6] object-cover"
                  />
                  {chats.find((chat) => chat.chatId === activeChat)?.isActive && (
                    <span className="absolute sm:bottom-0 -bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h4 className="text-base text-[#181D27]">
                    {chats.find((chat) => chat.chatId === activeChat)?.receiver?.name}
                  </h4>
                  {/* <p className="text-[#535862] text-xs">
                    {chats.find((chat) => chat.chatId === activeChat)?.receiver?.isActive
                      ? "Online"
                      : "Offline"}
                  </p> */}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <button
                    onClick={handleOpen}
                    className="text-white flex justify-center items-center gap-2 font-semibold rounded-[8px] bg-[#0F91D2] border-[#0F91D2] p-2">
                    Create Offer
                    <img className="size-5 object-contain" src={hand} alt="img" />
                  </button>
                </div>
                <button>
                  <BsThreeDotsVertical />
                </button>
                <div className="lg:hidden">
                  <button onClick={() => setOpen(false)} className="text-red-500">
                    <IoCloseCircle className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2 h-[calc(100dvh-360px)] overflow-y-auto">

              {messages.map((message, index) => {
                const isUser = message.sender.id === user?.id;

                return (
                  <div
                    ref={messagesEndRef}
                    key={index}
                    className={`flex gap-3 mb-3 ${isUser ? "justify-end" : ""}`}
                  >
                    {
                      message?.contentType === "order" ? (
                        <div className="p-2 flex justify-end">
                          <div className="   p-4 rounded-xl mt-2 bg-[#F5F5F5] max-w-[450px] w-80 shadow-[0px_8px_8px_-4px_#10182808,0px_20px_24px_-4px_#10182814]">
                            <div>
                              <div className="flex justify-between items-center ">
                                <p className="font-semibold">Created Offer</p>
                                <p className="font-bold text-xl">$ {message?.orderDetails?.total_amount}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <HiCalendar className="text-sm" />
                                <p className="text-xs font-medium text-[#181D27]">
                                  {new Date(message?.orderDetails?.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="mt-4">
                                <p className="text-[#34A853] text-sm font-medium bg-[#34A8531A] py-1 px-2 rounded-full inline">
                                  Cleaning
                                </p>
                                <p className="mt-4 text-[#535862] text-sm   ">
                                  {message?.orderDetails?.notes}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) :
                        (
                          <>
                            {!isUser && (
                              <img
                                src={message?.sender?.personal_image ? `${BASE_URL}/uploads/${message?.sender?.personal_image}` : ClientTwo}
                                // src={`${BASE_URL}/uploads/${message.sender.personal_image}` || ClientTwo}
                                alt={message.sender.name}
                                className={`rounded-full sm:size-9 size-6 object-cover `}
                              />
                            )}

                            {/* Message Content */}
                            <div className="max-w-[80%] sm:max-w-[60%] lg:max-w-[45%] w-full">
                              <div className="flex justify-between">
                                <h6 className={`font-medium ${isUser ? "text-[#414651]" : "text-[#181D27]"}`}>
                                  {message.sender.name}
                                </h6>
                                <p className="text-[#535862] text-xs">
                                  {new Date(message?.latestMessageSentAt)?.toLocaleTimeString() || new Date(message?.createdAt)?.toLocaleTimeString()}
                                </p>
                              </div>

                              {/* Message Bubble */}
                              <div className={`p-4 rounded-xl mt-2 ${isUser ? "bg-[#535862]" : "bg-[#F5F5F5]"}`}>
                                <p className={`${isUser ? "text-white" : "text-black"} w-full  sm:text-base text-xs whitespace-normal break-words `}>
                                  {message.content}
                                </p>
                              </div>
                            </div>
                          </>
                        )
                    }
                    {/* Sender Avatar */}

                  </div>
                );
              })}


            </div>
          </div>

          <div className="flex flex-col gap-2 p-2 border-t relative">
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
                      <p className="text-xs text-center">
                        {file?.name || "File attached"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{file?.name || "File attached"}</p>
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
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={!socket?.current?.connected}

                />
                {/* <label htmlFor="fil">
                  <FaPaperclip className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="fil"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}

                /> */}
              </div>
              <div>
                <button
                  disabled={!socket?.current?.connected}
                  className="bg-[#0F91D2] text-white text-xl py-3 2xl:px-6 px-3 shadow-lg rounded-md"
                  onClick={() => (socket?.current?.connected) && newMessage.trim() !== "" && handleSendMessage()}
                >
                  <IoPaperPlaneOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
        : (
          <div className="w-full flex flex-col items-center justify-center  bg-gray-100 text-gray-700">
            <div className="mb-4">
              <img src={logo} alt="Home Market Place" width={100} height={100} />
            </div>
            {/* <h1 className="text-2xl font-medium">bmaster for Mac</h1> */}
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <span className="mr-1">🔒</span> Your personal messages are <span className="text-green-600 ml-1">end-to-end encrypted</span>
            </p>
          </div>
        )}

    </div>

    <OfferModal isLoading={isLoading} isSuccess={isSuccess} handleClose={handleClose} handleOpen={handleOpen} modalopen={modalopen} onSubmit={onSubmit} userId={user?.id} />

  </>);
};



export default ChatApp;


