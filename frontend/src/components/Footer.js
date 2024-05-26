import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BiMailSend } from "react-icons/bi";
import { Box, Container, IconButton, Input, Link, SimpleGrid, Stack, Text, useColorModeValue, } from "@chakra-ui/react";
const Logo = (props) => {
    return (_jsx("svg", { height: 32, viewBox: "0 0 120 28", xmlns: "http://www.w3.org/2000/svg", ...props }));
};
const ListHeader = ({ children }) => {
    return (_jsx(Text, { fontWeight: "500", fontSize: "lg", mb: 2, children: children }));
};
export default function Footer() {
    return (_jsx(Box, { bg: useColorModeValue("gray.50", "gray.900"), color: useColorModeValue("gray.700", "gray.200"), width: "100%", py: 10, children: _jsx(Container, { as: Stack, maxW: "6xl", children: _jsxs(SimpleGrid, { templateColumns: { md: "2fr 1fr 1fr 2fr", sm: "1fr 1fr" }, spacing: 8, children: [_jsxs(Stack, { spacing: 6, children: [_jsx(Box, { children: _jsx(Logo, { color: useColorModeValue("gray.700", "white") }) }), _jsx(Text, { fontSize: "sm", children: "\u00A9 2024 VenusHacks. All Rights Reserved." })] }), _jsxs(Stack, { align: "flex-start", children: [_jsx(ListHeader, { children: "Company" }), _jsx(Link, { href: "#", children: "About us" }), _jsx(Link, { href: "#", children: "Chat" }), _jsx(Link, { href: "#", children: "Maps" })] }), _jsxs(Stack, { align: "flex-start", children: [_jsx(ListHeader, { children: "Support" }), _jsx(Link, { href: "#", children: "Help Center" }), _jsx(Link, { href: "#", children: "Terms of Service" }), _jsx(Link, { href: "#", children: "Privacy Policy" })] }), _jsxs(Stack, { align: "flex-start", children: [_jsx(ListHeader, { children: "Stay up to date" }), _jsxs(Stack, { direction: "row", children: [_jsx(Input, { placeholder: "Your email address", bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"), border: 0, _focus: {
                                            bg: "whiteAlpha.300",
                                        } }), _jsx(IconButton, { bg: useColorModeValue("purple.400", "purple.800"), color: useColorModeValue("white", "gray.800"), _hover: {
                                            bg: "purple.600",
                                        }, "aria-label": "Subscribe", icon: _jsx(BiMailSend, {}) })] })] })] }) }) }));
}
