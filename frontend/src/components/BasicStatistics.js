import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue, } from '@chakra-ui/react';
function StatsCard(props) {
    const { title, stat } = props;
    return (_jsxs(Stat, { px: { base: 4, md: 8 }, py: '5', shadow: 'xl', border: '1px solid', borderColor: useColorModeValue('gray.800', 'gray.500'), rounded: 'lg', children: [_jsx(StatLabel, { fontWeight: 'medium', isTruncated: true, children: title }), _jsx(StatNumber, { fontSize: '2xl', fontWeight: 'medium', children: stat })] }));
}
export default function BasicStatistics() {
    return (_jsxs(Box, { maxW: "7xl", mx: 'auto', pt: 5, px: { base: 2, sm: 12, md: 17 }, children: [_jsx(Box, { textAlign: 'center', py: 3, borderRadius: '50px', mb: 10, color: '#8C71D3', w: '600px', ml: '200px', border: '2px solid #4E4E4E' // Added black border
                , children: _jsx(chakra.h1, { fontSize: '4xl', fontWeight: 'bold', children: "What is our company doing?" }) }), _jsxs(SimpleGrid, { columns: { base: 1, md: 3 }, spacing: { base: 5, lg: 8 }, children: [_jsx(StatsCard, { title: 'We serve', stat: '50,000 women' }), _jsx(StatsCard, { title: 'In', stat: '30 different countries' }), _jsx(StatsCard, { title: 'Who speak', stat: '50+ different languages' })] })] }));
}
