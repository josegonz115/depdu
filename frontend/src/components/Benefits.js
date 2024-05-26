import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Text, Flex, Image, HStack, VStack, Button, keyframes } from "@chakra-ui/react";
import personalization from '../images/personalization.png';
import research from '../images/research.png';
import help from '../images/help.png';
import efficiency from '../images/efficiency.png';
import sapiens from '../images/sapiens.png';
// Define keyframes for the gradient circle animation
const gradientAnimation = keyframes `
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
function Benefits() {
    return (_jsx(Flex, { justifyContent: "center", alignItems: "center", backgroundColor: "white", width: "100vw", py: "40px", children: _jsxs(Box, { textAlign: "start", width: "80%", children: [_jsx(Text, { fontSize: "50px", fontWeight: "bold", pb: "30px", bgGradient: "linear(to-r, purple.400, pink.400)", bgClip: "text", pl: '50px', children: "Discover the benefits" }), _jsx(HStack, { spacing: "20px", justifyContent: "space-between", mb: "60px", children: [
                        { src: personalization, text: "Personalized" },
                        { src: research, text: "Research Driven" },
                        { src: efficiency, text: "Efficient" },
                        { src: help, text: "Helpful" }
                    ].map((item, index) => (_jsxs(React.Fragment, { children: [_jsxs(VStack, { textAlign: "center", width: "200px", alignItems: "center", children: [_jsx(Image, { src: item.src, boxSize: "80px", mb: "10px" }), _jsx(Text, { color: "black", children: item.text })] }), index < 3 && ( // Add gradient line between items, but not after the last item
                            _jsx(Box, { height: "90px", width: "5px", bgGradient: "linear(to-b, pink.400, purple.400)", borderRadius: '15px' }))] }, index))) }), _jsxs(HStack, { spacing: "40px", alignItems: "center", children: [_jsx(Image, { src: sapiens, boxSize: "400px", objectFit: "cover" }), _jsxs(VStack, { align: "start", spacing: "20px", children: [_jsx(Text, { fontSize: "36px", fontWeight: "bold", color: "black", children: "Don't know where to start? We got you!" }), _jsx(Text, { fontSize: "24px", color: "black", pb: '15px', children: "Lean more about your human body and find resources catered to your needs. A community created by women to empower and encourage those who seek outlets of information! \u263A" }), _jsx(Button, { borderRadius: "30px", color: "black", backgroundColor: "#CEA7E0", width: "150px", overflow: "hidden", position: "relative", _hover: {
                                        _before: {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            background: "linear-gradient(270deg, pink, purple)",
                                            backgroundSize: "200% 200%",
                                            animation: `${gradientAnimation} 3s ease infinite`,
                                            borderRadius: "inherit",
                                            zIndex: -1,
                                        },
                                        color: "white",
                                    }, ml: '225px', children: "Get Started!" })] })] })] }) }));
}
export default Benefits;
