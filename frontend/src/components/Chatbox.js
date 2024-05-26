import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FiSend } from "react-icons/fi";
import pfp from '../images/msgpfp.jpeg';
import duckpfp from '../images/duckpfp.jpeg';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatMessage = ({ text, sender, profileIcon }) => {
    return (_jsxs("div", { className: `flex ${sender === "user" ? "justify-end" : "justify-start"} items-end`, children: [sender === "llm" && (_jsx("img", { src: duckpfp, alt: "profile", className: "w-8 h-8 rounded-full mr-2" })), _jsx("div", { className: `p-3 rounded-lg shadow ${sender === "user" ? "bg-blue-100 self-end" : "bg-white self-start"}`, style: { maxWidth: '75%', minWidth: '30%', wordBreak: 'break-word' }, children: _jsx(Markdown, { remarkPlugins: [remarkGfm], children: text }) }), sender === "user" && (_jsx("img", { src: pfp, alt: "profile", className: "w-8 h-8 rounded-full ml-2" }))] }));
};
const Chatbox = ({ sharedOptionsHandler }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [socket, setSocket] = useState(null);
    const [streamStarted, setStreamStarted] = useState(false);
    const [chatboxActivate, setChatboxActivate] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState('');
    // const [currentResponse, setCurrentResponse] = useState('');
    useEffect(() => {
        // const socket = io("http://localhost:5010"); // FINISH
        const socket = io(import.meta.env.VITE_WEBSOCKET); // FINISH
        setSocket(socket);
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: '', sender: "llm" }]);
        setStreamStarted(true);
        // Emit an event when the page has fully loaded
        socket.emit("page loaded");
        return () => {
            socket.disconnect();
        };
    }, []);
    useEffect(() => {
        console.log(chatHistory); //TESTING
        if (socket && currentPrompt.length > 0 && !streamStarted) {
            setChatHistory(prevChatHistory => {
                const updatedChatHistory = [...prevChatHistory, { text: currentPrompt, sender: 'user' }];
                socket.emit("button pressed", updatedChatHistory);
                return updatedChatHistory;
            });
            setStreamStarted(true);
            setChatHistory(prevChatHistory => [...prevChatHistory, { text: '', sender: "llm" }]);
            setCurrentPrompt('');
        }
    }, [chatboxActivate]);
    useEffect(() => {
        if (socket) {
            const handler = (data) => {
                console.log(data);
                setChatHistory(prevChatHistory => {
                    const newChatHistory = [...prevChatHistory];
                    newChatHistory[newChatHistory.length - 1].text += data.response;
                    return newChatHistory;
                });
            };
            const endHandler = () => {
                console.log('Stream ended');
                setStreamStarted(false);
                const lastMessage = chatHistory[chatHistory.length - 1];
                if (lastMessage.sender === 'llm') {
                    sharedOptionsHandler(lastMessage.text);
                }
            };
            socket.on("chatbox", handler);
            socket.on("chatbox end", endHandler);
            return () => {
                socket.off("chatbox", handler);
                socket.off("chatbox end", endHandler);
            };
        }
    });
    return (_jsxs("div", { className: "flex flex-col h-screen w-full bg-white", children: [" ", _jsxs("div", { className: "mx-auto bg-gray-200 h-5/6 w-5/6 rounded-lg flex flex-col mb-2 mt-10", children: [" ", _jsx("div", { className: "bg-indigo-400 h-20 rounded-t-lg flex justify-center items-center", children: _jsx("h1", { className: "text-white text-4xl font-bold", children: "Chat" }) }), " ", _jsxs("div", { className: "flex flex-col gap-2 overflow-y-scroll h-[75%] mt-2 mx-2 p-2", children: [" ", chatHistory.map((chat, index) => (_jsx(ChatMessage, { text: chat.text, sender: chat.sender }, index)))] }), _jsxs("div", { className: "flex items-center p-2 border-t border-gray-300  my-auto ", children: [" ", _jsx("input", { placeholder: 'Message depdu...', className: "flex-grow bg-white h-10 px-4 border border-gray-300 rounded-lg", value: currentPrompt, onChange: e => setCurrentPrompt(e.target.value) }), _jsx("button", { className: "ml-2 text-blue-500", onClick: () => setChatboxActivate(!chatboxActivate), children: _jsx(FiSend, { size: 24, color: 'black' }) })] })] }), _jsx("button", { className: "mx-auto w-5/6 h-10 rounded-1xl shadow-md bg-gradient-to-r font-bold text-l bg-gray-200 mb-2 mt-2", children: "View All Saved" }), " "] }));
};
export default Chatbox;
