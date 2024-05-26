import { Text, Image, Link } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { TSuggestions } from "../routes/ChatbotPage";

// export type IProductSuggestion = {
//     name: string;
//     pictureUrl: string;
//     description: string;
//     url: string
// };

// image: string;
// title: string;
// url: string;
// content: string;

const SuggestionCard: React.FC<TSuggestions> = ({
    image,
    title,
    url,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content,
}) => {
    return (
        <Link href={url} isExternal>
        <div className="w-[9rem]">
            <div className="bg-gray-300 h-[13rem] w-[11rem] rounded-lg flex">
                {/* <Text fontSize={"xs"} >
                    {content}
                </Text> */}
                <Image src={image} objectFit='contain' alt={title} className="my-auto "/>
            </div>
            <div className="flex justify-between">
                <Text fontSize={'sm'}>{title}</Text>
                <div className="pt-1">
                    <FaRegHeart />
                </div>
            </div>
        </div>
        </Link>

    );
};

export default SuggestionCard;
