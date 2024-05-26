import { useState, useEffect } from "react";
import "./ChatboxPage.css";
import Chatbox from "../components/Chatbox";
import Suggestions from "../components/Suggestions";

export type TSuggestions = {
    image: string;
    title: string;
    url: string;
    content: string;
};

const Chat = () => {
    const [sharedOptions, setSharedOptions] = useState<string>("");
    const [suggestionsObj, setSuggestionsObj] = useState<TSuggestions[]>([]);

    useEffect(() => {
        if(sharedOptions.length > 1){
            const fetchSuggestions = async () => {
                // const response = await fetch("http://localhost:5000/api/ai/crawl", {
                console.log(`${import.meta.env.VITE_SERVER}/api/ai/crawl`);
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/ai/crawl`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ options: sharedOptions }),
                });
                const { options }: { options: TSuggestions[] } = await response.json();
                // const dataJson:TSuggestions[] = await response.json();
                console.log(options); //TESTING
                setSuggestionsObj(options);
            };
            fetchSuggestions();
        }
    }, [sharedOptions]);

    const sharedOptionsHandler = (newData: string) => {
        const lines = newData.split("\n");
        if (lines[0].toLowerCase().startsWith("options:")) {
            const optionsLine = lines[0].split(":")[1];
            // const splitOptions = optionsLine.split(',').map(option => option.trim());
            // console.log(splitOptions);//TESTING
            setSharedOptions(optionsLine.trim());
        }
    };
    return (
        <>
            <div className="flex bg-white flex-grow">
                <Chatbox sharedOptionsHandler={sharedOptionsHandler} />
                <Suggestions sharedOptions={suggestionsObj} />
            </div>
        </>
    );
};

export default Chat;