import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Flex, Avatar, HStack, IconButton, Link as ChakraLink, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Stack, Image, } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import msgpfp from '../images/msgpfp.jpeg';
import { Link as ReactRouterLink } from 'react-router-dom';
import logo from '../images/logo.png';
const Links = [['/', 'Home'], ['/chat', 'Chat'], ['/maps', 'Maps']];
const NavLink = ({ children, addy }) => (_jsx(ChakraLink, { as: ReactRouterLink, to: addy, px: 2, py: 1, rounded: 'md', _hover: {
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
    }, children: children }));
function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (_jsx(_Fragment, { children: _jsxs(Box, { bg: useColorModeValue('#F1DCED'), px: 4, children: [_jsxs(Flex, { h: '80px', alignItems: 'center', justifyContent: 'space-between', children: [_jsx(IconButton, { size: 'md', icon: isOpen ? _jsx(IoIosClose, {})
                                : _jsx(RxHamburgerMenu, {}), "aria-label": 'Open Menu', display: { md: 'none' }, onClick: isOpen ? onClose : onOpen }), _jsxs(HStack, { spacing: 8, alignItems: 'center', children: [_jsx(Box, { w: '50px', h: '50px', children: _jsx(Image, { src: logo }) }), _jsx(HStack, { as: 'nav', spacing: 4, display: { base: 'none', md: 'flex' }, children: Links.map((link) => (_jsx(NavLink, { addy: link[0], children: link[1] }, link[0]))) })] }), _jsxs(Flex, { alignItems: 'center', children: [_jsx(Button, { variant: 'solid', backgroundColor: '#AD8DD3', size: 'md', mr: 9, color: 'white', children: "Signup/Login" }), _jsxs(Menu, { children: [_jsx(MenuButton, { as: Button, rounded: 'full', variant: 'link', cursor: 'pointer', minW: 0, children: _jsx(Avatar, { size: 'md', src: msgpfp }) }), _jsxs(MenuList, { children: [_jsx(MenuItem, { children: "Link 1" }), _jsx(MenuItem, { children: "Link 2" }), _jsx(MenuDivider, {}), _jsx(MenuItem, { children: "Link 3" })] })] })] })] }), isOpen ? (_jsx(Box, { pb: 4, display: { md: 'none' }, children: _jsx(Stack, { as: 'nav', spacing: 4, children: Links.map((link) => (_jsx(NavLink, { addy: link[0], children: link[1] }, link[0]))) }) })) : null] }) }));
}
export default NavBar;
