import { Text } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";


export type IProductSuggestion = {
    name: string;
    pictureUrl: string;
    description: string;
};

const SuggestionCard: React.FC<IProductSuggestion> = ({
    name,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pictureUrl,
    description,
}) => {
    return (
        <div className="w-[9rem]">
            <div className="bg-gray-300 h-[13rem] w-[11rem] rounded-lg">
                <Text fontSize={"xs"} noOfLines={[1, 2, 3]}>
                    {description}
                </Text>
            </div>
            <div className="flex justify-between">
                <h3>{name}</h3>
                <div className="pt-1">
                <FaRegHeart/>
                </div>
                
            </div>
        </div>
    );
};

export default SuggestionCard;
