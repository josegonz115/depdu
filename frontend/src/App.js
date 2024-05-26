import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import LandingPage from './routes/LandingPage';
import Chat from './routes/ChatbotPage';
import NavBar from './components/NavBar';
//import Chat from './routes/ChatbotPage';
import Maps from './components/Maps';
function App() {
    return (_jsx("main", { className: 'App', children: _jsxs(BrowserRouter, { basename: "/", children: [_jsx(NavBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), " ", _jsx(Route, { path: "/chat", element: _jsx(Chat, {}) }), " ", _jsx(Route, { path: "/maps", element: _jsx(Maps, {}) }), " ", _jsx(Route, { path: "*", element: _jsx("h1", { className: 'm-auto', children: "Ooopsie no page here \uD83E\uDD79" }) }), " "] })] }) }));
}
export default App;
