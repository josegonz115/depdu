import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Container } from "@chakra-ui/react";
import TextAnimation from './TextAnimation';
import BasicStatistics from './BasicStatistics';
function YellowCircleBackground() {
    return (_jsxs(Box, { position: "absolute", zIndex: "-1", left: "50%", transform: "translateX(-50%)", top: "-1600px" // Adjust the top value to position the circle
        , width: "2150px", height: "2150px", overflow: "hidden", children: [_jsx(Box, { position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "2100px", height: "2100px", borderRadius: "50%", background: "#FCF9FF", boxShadow: "0px 43px 61.3px 0px rgba(226, 206, 255, 1)", zIndex: "1" }), _jsx(Box, { position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "2100px", height: "2100px", borderRadius: "50%", background: "radial-gradient(45.49% 45.49% at 50% 50%, purple 0%, #FFF 100%)", mixBlendMode: "multiply", zIndex: "0" })] }));
}
function Intro() {
    return (_jsxs(Container, { maxW: "container.xl", p: 4, children: [_jsx(Flex, { position: "relative", justifyContent: "center", alignItems: "center", height: "60vh", children: _jsxs(Box, { pt: "50px", textAlign: "center", position: "relative", children: [_jsx(TextAnimation, { AnimatedSequence: [
                                "contraceptives near me.",
                                "information about my body.",
                                "birth control recommendations.",
                            ], baseText: "I'm looking for", AnimatedSpeed: 2000, AnimatedColor: "#786AF4", BaseColor: "black" }), _jsx(YellowCircleBackground, {})] }) }), _jsx(Box, { mt: -20, children: _jsx(BasicStatistics, {}) })] }));
}
export default function Home() {
    return (_jsx("div", { children: _jsx(Intro, {}) }));
}
