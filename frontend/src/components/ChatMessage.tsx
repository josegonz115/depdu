import { Avatar, Text } from "@chakra-ui/react";
import Robot from "../assets/human.jpg";
import Human from "../assets/robot.png";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type THistory = {
    text: string;
    sender: "user" | "llm";
};

const ChatMessage: React.FC<THistory> = ({ text, sender }) => {
    const icon = sender === "user" ? Human : Robot;

    return (
        <div
            className={`flex gap-2 ${
                sender === "user" ? "justify-end" : "justify-start"
            }`}
        >
            {" "}
            {/* chatmessage container*/}
            {sender === "user" ? (
                <>
                    <Text fontSize="xs" className="chatMessage-text">
                        {text}
                    </Text>
                    <Avatar size="sm" name="name" src={icon} />{" "}
                </>
            ) : (
                <>
                    <Avatar size="sm" name="name" src={icon} />{" "}
                    <Text fontSize="xs" className="chatMessage-text">
                        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                    </Text>
                </>
            )}
        </div>
    );
};

export default ChatMessage;
