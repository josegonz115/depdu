import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex, Stack, Text, useColorMode } from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
function TextAnimation({ AnimatedColor = "gray.800", AnimatedSequence = [""], AnimatedSpeed = 1000, BaseColor = "gray.800", baseText, }) {
    const { colorMode } = useColorMode();
    return (_jsx(Flex, { maxHeight: "250px", alignItems: "center", justifyContent: "center", children: _jsx(Box, { children: _jsx(Stack, { display: "flex", alignItems: "center", justifyContent: "center", children: _jsxs(Text, { fontWeight: "bold", fontSize: "5xl", color: BaseColor, _dark: {
                        color: "appetite_white",
                    }, width: "800px", height: "250px", overflow: "hidden", textAlign: "center", children: [baseText, " ", _jsx(TypeAnimation, { sequence: AnimatedSequence.flatMap((text) => [
                                text,
                                AnimatedSpeed,
                            ]), wrapper: "span", speed: 50, deletionSpeed: 65, style: { color: AnimatedColor, display: "inline-block" }, repeat: Infinity })] }) }) }) }));
}
export default TextAnimation;
