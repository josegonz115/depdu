import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { FiSend } from "react-icons/fi";
import pfp from '../images/msgpfp.jpeg';
import duckpfp from '../images/duckpfp.jpeg';

export type TllmResponse = {
    response:string
};

export interface THistory {
    text: string;
    sender: "user" | "llm";
    profileIcon?: string;
}

const ChatMessage = ({ text, sender, profileIcon }: THistory) => {
    return (
        <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} items-end`}>
            {sender === "llm" && (
                <img src={duckpfp} alt="profile" className="w-8 h-8 rounded-full mr-2" />
            )}
            <div className={`p-3 rounded-lg shadow ${sender === "user" ? "bg-blue-100 self-end" : "bg-white self-start"}`}
                style={{ maxWidth: '75%', minWidth: '30%', wordBreak: 'break-word' }}>
                {text}
            </div>
            {sender === "user" && (
                <img src={pfp} alt="profile" className="w-8 h-8 rounded-full ml-2" />
            )}
        </div>
    );
};

const Chatbox = () => {
    const [chatHistory, setChatHistory] = useState<THistory[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [streamStarted, setStreamStarted] = useState(false);
    const [chatboxActivate, setChatboxActivate] = useState(false);
    // const [llmResponses, setLlmResponse] = useState<string[]>([]);
    // const [userPrompts, setUserPrompts] = useState<string[]>([]);
    const [currentPrompt, setCurrentPrompt] = useState('');
    // const [currentResponse, setCurrentResponse] = useState('');


    // useEffect(() => {
    //     const history: THistory[] = [];
    //     for (let i = 0; i < llmResponses.length; i++) {
    //         history.push({ text: userPrompts[i], sender: "user" });
    //         history.push({ text: llmResponses[i], sender: "llm" });
    //     }
    //     setChatHistory(history);
    // }, [currentResponse]);

    useEffect(() => {
        const socket = io("http://localhost:5010"); // FINISH
        setSocket(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket && currentPrompt.length > 0 && !streamStarted) {
            console.log(chatboxActivate);
            socket.emit("button pressed");
            setStreamStarted(true);
            setChatHistory(prevChatHistory => [...prevChatHistory, { text: '', sender: "llm" }]);
        }
    }, [chatboxActivate]);


    // const llmResponses = [
    //     "Hello, how can I assist you today?",
    //     "There are several types of birth control methods including barrier methods, hormonal methods, emergency contraception, and permanent methods. Which one are you interested in?",
    //     "Barrier methods include things like condoms and diaphragms. Hormonal methods include birth control pills, patches, shots, vaginal rings, and implants.",
    //     "Yes, birth control pills are a type of hormonal contraception. They work by preventing ovulation and thickening cervical mucus to keep sperm from reaching the egg.",
    //     "It is recommended to take the pill at the same time every day. If you miss a pill, follow the instructions on the package or contact your healthcare provider.",
    //     `You're welcome! If you have any other questions, feel free to ask.`,
    // ];

    // const userPrompts = [
    //     "I have a question about birth control.",
    //     "Can you tell me about the different types of birth control?",
    //     "Can you tell me more about hormonal methods?",
    //     "How do birth control pills work?",
    //     "What happens if I miss a pill?",
    //     "Thank you for the information.",
    // ];
    // useEffect(() => {
    //     const history: THistory[] = [];
    //     for (let i = 0; i < llmResponses.length; i++) {
    //         history.push({ text: userPrompts[i], sender: "user" });
    //         history.push({ text: llmResponses[i], sender: "llm" });
    //     }
    //     setChatHistory(history);
    // }, []);

    useEffect(() => {
        if(socket){
            const handler = (data:TllmResponse) => {
                console.log(data); 
                setChatHistory(prevChatHistory => {
                    const newChatHistory = [...prevChatHistory];
                    newChatHistory[newChatHistory.length - 1].text += data.response;
                    return newChatHistory;
                });
            }
            const endHandler = () => {
                console.log('Stream ended'); 
                setStreamStarted(false);
            };
            socket.on("chatbox", handler);
            socket.on("chatbox end", endHandler);
            return () => {
                socket.off("chatbox", handler);
                socket.off("chatbox end", endHandler);
            };
        }
    });

    return (
        <div className="flex flex-col h-screen w-full bg-white"> {/* chatbox */}
            <div className="mx-auto bg-gray-200 h-5/6 w-5/6 rounded-lg flex flex-col mb-2 mt-10"> {/* chatbox box */}
                <div className="bg-indigo-400 h-20 rounded-t-lg flex justify-center items-center">
                    <h1 className="text-white text-4xl font-bold">Chat</h1>
                </div> {/* chatbox-box-header */}
                <div className="flex flex-col gap-2 overflow-y-scroll h-[75%] mt-2 mx-2 p-2"> {/* chatbox-box-messages */}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage
                            key={index}
                            text={chat.text}
                            sender={chat.sender}
                        />
                    ))}
                </div>
                <div className="flex items-center p-2 border-t border-gray-300"> {/* input container */}
                    <input 
                        placeholder='Message depdu...' 
                        className="flex-grow bg-white h-10 px-4 border border-gray-300 rounded-lg" 
                    />
                    <button className="ml-2 text-blue-500">
                        <FiSend size={24} color='black'/>
                    </button>
                </div>
            </div>
            <button className="mx-auto w-5/6 h-10 rounded-1xl shadow-md bg-gradient-to-r 
            font-bold text-l bg-gray-200 mb-2 mt-2">View All Saved</button> {/* chatbox-viewsaved */}
        </div>
    );
};

export default Chatbox;
