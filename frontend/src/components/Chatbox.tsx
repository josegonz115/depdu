import React, { useEffect, useState } from "react";
import ChatMessage, { THistory } from "./ChatMessage";
import { io, Socket } from "socket.io-client";

export type TllmResponse = {
    response:string
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
        <div className="flex flex-col flex-45 bg-orange-500 ">
            {" "}
            {/* chatbox */}
            <div className="mx-auto mt-auto bg-grey-mylight h-5/6 w-5/6 rounded-lg">
                {" "}
                {/* chatbox  box*/}
                <div className="bg-purple-my h-20 rounded-t-lg"></div>{" "}
                {/* chatbox-box-header*/}
                <div className="flex flex-col gap-8 overflow-y-scroll h-4/5 bg-grey-mylight mt-2 mx-2">
                    {" "}
                    {/* chatbox-box-messages*/}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage
                            key={index}
                            text={chat.text}
                            sender={chat.sender}
                        />
                    ))}
                </div>
                <input
                    placeholder="Message depdu"
                    className="block bg-white h-[5%] rounded-2xl w-[80%] mx-auto my-auto mt-4 px-2"
                    value={currentPrompt}
                    onChange={e => setCurrentPrompt(e.target.value)}
                ></input>
            </div>
            <button
                className="mx-auto w-5/6 h-10 bg-grey-mydark my-auto rounded-2xl shadow-md"
                onClick={() => setChatboxActivate(!chatboxActivate)}
            >
                View All Saved
            </button>{" "}
            {/* chatbox-viewsaved  */}
        </div>
    );
};

export default Chatbox;
