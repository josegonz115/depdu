import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import SuggestionCard from './SuggestionCard';
const Suggestions = ({ sharedOptions }) => {
    return (_jsx("div", { className: 'w-full h-screen flex flex-col pr-20', children: sharedOptions && sharedOptions.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("h3", { className: 'w-full text-center my-5 text-4xl font-bold pt-5 text-black', children: "More information on contraceptives" }), _jsx("div", { className: 'grid grid-cols-3 grid-flow-row place-items-center gap-10 my-10', children: sharedOptions.map((s, index) => (_jsx(SuggestionCard, { title: s.title, image: s.image, content: s.content, url: s.url }, index))) })] })) : (_jsx("h2", { className: 'h-20 w-1/2 m-auto', children: "No suggestions yet \uD83E\uDD7A" })) }));
};
export default Suggestions;
