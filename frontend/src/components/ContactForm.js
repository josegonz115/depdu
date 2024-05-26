import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import connect from "../images/connect.png";
import { Box, Button, Container, Flex, FormControl, FormErrorMessage, Heading, Input, InputGroup, InputLeftElement, Textarea, VStack, Wrap, WrapItem, Text, Image, } from "@chakra-ui/react";
function YellowCircleBackground() {
    return (_jsxs(Box, { position: "absolute", zIndex: "-1", left: "50%", transform: "translateX(-50%)", bottom: "0", width: "100%", children: [_jsx(Box, { position: "absolute", top: "-875px", left: "5%", width: "550px", height: "500px", borderRadius: "50%", background: "radial-gradient(45.49% 45.49% at 50% 50%, #DBB6CC 0%, #FFF 100%)" }), _jsx(Box, { position: "absolute", top: "-650px", left: "25%", width: "464px", height: "464px", borderRadius: "50%", mixBlendMode: "multiply", background: "radial-gradient(45.49% 45.49% at 50% 50%, #CEA7E0 0%, #FFF 100%)" }), _jsx(Box, { position: "absolute", top: "-600px", left: "0%", width: "590px", height: "590px", borderRadius: "50%", mixBlendMode: "multiply", background: "radial-gradient(45.49% 45.49% at 50% 50%, pink 0%, #FFF 100%)" })] }));
}
function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name)
            newErrors.name = "Must be a name";
        if (!email)
            newErrors.email = "Must input email address";
        if (!message)
            newErrors.message = "No message filled out";
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Handle form submission
            console.log("Form submitted", { name, email, message });
            // Clear form fields
            setName("");
            setEmail("");
            setMessage("");
            setSubmitted(true);
        }
    };
    const isFormValid = name && email && message;
    return (_jsxs(Container, { maxW: "full", mt: 30, centerContent: true, overflow: "hidden", position: "relative", children: [_jsx(YellowCircleBackground, {}), _jsxs(Flex, { alignItems: "center", flexDirection: { base: "column", md: "row" }, children: [_jsx(Box, { borderRadius: "lg", m: { lg: 10, md: 16, sm: 4 }, p: { lg: 16, md: 5, sm: 5 }, children: _jsx(Box, { children: _jsx(Wrap, { spacing: { base: 20, lg: 20, md: 5, sm: 3 }, children: _jsx(WrapItem, { children: _jsx(Box, { borderRadius: "lg", children: _jsx(Box, { m: 8, color: "#0B0E3F", children: _jsxs(VStack, { spacing: 5, as: "form", onSubmit: handleSubmit, children: [_jsx(Heading, { fontSize: "50px", fontWeight: "bold", pb: "15px", bgGradient: "linear(to-r, purple.400, pink.400)", bgClip: "text", children: "Let's connect!" }), submitted && (_jsx(Text, { color: "green.500", fontWeight: "bold", children: "Submitted!" })), _jsxs(FormControl, { id: "name", isInvalid: errors.name, isRequired: true, children: [_jsxs(InputGroup, { borderColor: "#838383", children: [_jsx(InputLeftElement, { pointerEvents: "none" }), _jsx(Input, { backgroundColor: "#FFFCF7", color: "#7F7F7F", type: "text", size: "md", placeholder: "Full name *", fontSize: "20px", fontWeight: "bold", height: "70px", value: name, onChange: (e) => setName(e.target.value) })] }), errors.name && (_jsx(FormErrorMessage, { children: errors.name }))] }), _jsxs(FormControl, { id: "email", isInvalid: errors.email, isRequired: true, children: [_jsxs(InputGroup, { borderColor: "#838383", children: [_jsx(InputLeftElement, { pointerEvents: "none" }), _jsx(Input, { backgroundColor: "#FFFCF7", color: "#7F7F7F", type: "email", size: "md", placeholder: "Email Address *", fontSize: "20px", fontWeight: "bold", height: "70px", value: email, onChange: (e) => setEmail(e.target.value) })] }), errors.email && (_jsx(FormErrorMessage, { children: errors.email }))] }), _jsxs(FormControl, { id: "message", isInvalid: errors.message, isRequired: true, width: "547px", height: "277px", children: [_jsx(Textarea, { borderColor: "#838383", backgroundColor: "#FFFCF7", placeholder: "How can we assist you? *", p: "25px 0px 0px 40px", fontWeight: "bold", color: "#7F7F7F", fontSize: "20px", height: "277px", value: message, onChange: (e) => setMessage(e.target.value) }), errors.message && (_jsx(FormErrorMessage, { children: errors.message }))] }), _jsx(FormControl, { id: "submit", display: "flex", justifyContent: "center", pt: "15px", children: _jsx(Button, { type: "submit", variant: "solid", bg: "#AD8DD3", color: "white", borderRadius: "10px", p: "25px 25px 25px 25px", boxShadow: "2px 3px 4.3px 0px rgba(0, 0, 0, 0.25)", _hover: {}, disabled: !isFormValid, children: "Send Message" }) })] }) }) }) }) }) }) }), _jsx(Box, { m: 8, children: _jsx(Image, { src: connect, alt: "Team Up", pr: '30px' }) })] })] }));
}
export default ContactForm;
