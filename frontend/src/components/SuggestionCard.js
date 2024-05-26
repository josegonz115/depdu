import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Image, Link } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
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
const SuggestionCard = ({ image, title, url, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
content, }) => {
    return (_jsx(Link, { href: url, isExternal: true, children: _jsxs("div", { className: "w-[9rem]", children: [_jsx("div", { className: "bg-gray-300 h-[13rem] w-[11rem] rounded-lg flex", children: _jsx(Image, { src: image, objectFit: 'contain', alt: title, className: "my-auto " }) }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { fontSize: 'sm', children: title }), _jsx("div", { className: "pt-1", children: _jsx(FaRegHeart, {}) })] })] }) }));
};
export default SuggestionCard;
