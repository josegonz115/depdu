import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Text } from "@chakra-ui/react";
import Robot from "../assets/human.jpg";
import Human from "../assets/robot.png";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const ChatMessage = ({ text, sender }) => {
    const icon = sender === "user" ? Human : Robot;
    return (_jsxs("div", { className: `flex gap-2 ${sender === "user" ? "justify-end" : "justify-start"}`, children: [" ", sender === "user" ? (_jsxs(_Fragment, { children: [_jsx(Text, { fontSize: "xs", className: "chatMessage-text", children: text }), _jsx(Avatar, { size: "sm", name: "name", src: icon }), " "] })) : (_jsxs(_Fragment, { children: [_jsx(Avatar, { size: "sm", name: "name", src: icon }), " ", _jsx(Text, { fontSize: "xs", className: "chatMessage-text", children: _jsx(Markdown, { remarkPlugins: [remarkGfm], children: text }) })] }))] }));
};
export default ChatMessage;
