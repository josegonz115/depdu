import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.createRoot(document.getElementById("root")).render(
// <React.StrictMode>
_jsx(ChakraProvider, { children: _jsx(App, {}) })
// </React.StrictMode>
);
