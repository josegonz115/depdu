import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, VStack } from "@chakra-ui/react";
import Intro from '../components/Intro';
import Benefits from '../components/Benefits';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
function LandingPage() {
    return (_jsxs(VStack, { spacing: 0, children: [_jsx(Box, { height: '100vh', children: _jsx(Intro, {}) }), _jsx(Box, { mt: "15px", children: _jsx(Benefits, {}) }), _jsx(Box, { children: _jsx(ContactForm, {}) }), _jsx(Footer, {})] }));
}
export default LandingPage;
