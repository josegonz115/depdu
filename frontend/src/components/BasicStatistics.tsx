import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  interface StatsCardProps {
    title: string;
    stat: string;
  }
  
  function StatsCard(props: StatsCardProps) {
    const { title, stat } = props;
    return (
      <Stat
        px={{ base: 4, md: 8 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <StatLabel fontWeight={'medium'} isTruncated>
          {title}
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
          {stat}
        </StatNumber>
      </Stat>
    );
  }
  
  export default function BasicStatistics() {
    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Box
          textAlign={'center'}
          py={3}
          borderRadius='50px'
          mb={10}
          color='#8C71D3'
          w='600px'
          ml='200px'
          border='2px solid #4E4E4E' // Added black border
        >
          <chakra.h1 fontSize={'4xl'} fontWeight={'bold'}>
            What is our company doing?
          </chakra.h1>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={'We serve'} stat={'50,000 women'} />
          <StatsCard title={'In'} stat={'30 different countries'} />
          <StatsCard title={'Who speak'} stat={'50+ different languages'} />
        </SimpleGrid>
      </Box>
    );
  }
  