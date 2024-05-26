import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./ChatboxPage.css";
import Chatbox from "../components/Chatbox";
import Suggestions from "../components/Suggestions";
const Chat = () => {
    const [sharedOptions, setSharedOptions] = useState("");
    const [suggestionsObj, setSuggestionsObj] = useState([]);
    useEffect(() => {
        if (sharedOptions.length > 1) {
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
                const { options } = await response.json();
                // const dataJson:TSuggestions[] = await response.json();
                console.log(options); //TESTING
                setSuggestionsObj(options);
            };
            fetchSuggestions();
        }
    }, [sharedOptions]);
    const sharedOptionsHandler = (newData) => {
        const lines = newData.split("\n");
        if (lines[0].toLowerCase().startsWith("options:")) {
            const optionsLine = lines[0].split(":")[1];
            // const splitOptions = optionsLine.split(',').map(option => option.trim());
            // console.log(splitOptions);//TESTING
            setSharedOptions(optionsLine.trim());
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex bg-white flex-grow", children: [_jsx(Chatbox, { sharedOptionsHandler: sharedOptionsHandler }), _jsx(Suggestions, { sharedOptions: suggestionsObj })] }) }));
};
export default Chat;
