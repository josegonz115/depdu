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
            <div className="bg-grey-mylight h-[9rem]">
                <Text fontSize={"xs"} noOfLines={[1, 2, 3]}>
                    {description}
                </Text>
            </div>
            <div className="flex justify-between">
                <h3>{name}</h3>
                <FaRegHeart />
            </div>
        </div>
    );
};

export default SuggestionCard;
