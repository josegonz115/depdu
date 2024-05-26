import React, { useEffect, useState } from "react";
import ChatMessage, { THistory } from "./ChatMessage";
import { io, Socket } from "socket.io-client";



const Chatbox = () => {
    const llmResponses = [
        "Hello, how can I assist you today?",
        "There are several types of birth control methods including barrier methods, hormonal methods, emergency contraception, and permanent methods. Which one are you interested in?",
        "Barrier methods include things like condoms and diaphragms. Hormonal methods include birth control pills, patches, shots, vaginal rings, and implants.",
        "Yes, birth control pills are a type of hormonal contraception. They work by preventing ovulation and thickening cervical mucus to keep sperm from reaching the egg.",
        "It is recommended to take the pill at the same time every day. If you miss a pill, follow the instructions on the package or contact your healthcare provider.",
        `You're welcome! If you have any other questions, feel free to ask.`,
    ];

    const userPrompts = [
        "I have a question about birth control.",
        "Can you tell me about the different types of birth control?",
        "Can you tell me more about hormonal methods?",
        "How do birth control pills work?",
        "What happens if I miss a pill?",
        "Thank you for the information.",
    ];

    const [chatHistory, setChatHistory] = useState<THistory[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    
    useEffect(()=>{
        const socket = io("http://localhost:6000"); // FINISH
        setSocket(socket);

    },[]);


    useEffect(() => {
        const history: THistory[] = [];
        for (let i = 0; i < llmResponses.length; i++) {
            history.push({ text: userPrompts[i], sender: "user" });
            history.push({ text: llmResponses[i], sender: "llm" });
        }
        setChatHistory(history);
    }, []);

    return (
        <div className="flex flex-col flex-45 bg-orange-500 "> {/* chatbox */}
            <div className="mx-auto mt-auto bg-grey-mylight h-5/6 w-5/6 rounded-lg"> {/* chatbox  box*/}
                <div className="bg-purple-my h-20 rounded-t-lg"></div> {/* chatbox-box-header*/}
                <div className="flex flex-col gap-8 overflow-y-scroll h-4/5 bg-grey-mylight mt-2 mx-2"> {/* chatbox-box-messages*/}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage
                            key={index}
                            text={chat.text}
                            sender={chat.sender}
                        />
                    ))}
                </div>
                <input placeholder='Message depdu' className="block bg-white h-[5%] rounded-2xl w-[80%] mx-auto my-auto mt-4 px-2"></input> 
            </div>
            <button className="mx-auto w-5/6 h-10 bg-grey-mydark my-auto rounded-2xl shadow-md">View All Saved</button> {/* chatbox-viewsaved  */}
        </div>
    );
};

export default Chatbox;
