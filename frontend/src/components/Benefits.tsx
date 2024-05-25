import React from 'react'; 
import { Box, Text, Flex, Image, HStack, VStack, Button } from "@chakra-ui/react";
import personalization from '../images/personalization.png';
import research from '../images/research.png';
import help from '../images/help.png';
import efficiency from '../images/efficiency.png';
import sapiens from '../images/sapiens.png'

function Benefits() {
  return (
    <Flex justifyContent="center" alignItems="center" backgroundColor="pink" minHeight="100vh">
      <Box textAlign="start">
        <Text fontSize="50px" mb="20px" fontWeight='bold' color='black' pl='70px'>Discover the benefits</Text>
        
        <HStack spacing="40px" justifyContent="center" mb="20px">
            <Box textAlign="center" width='289px' height='100px'>
                <Image src={personalization} width="100px" height="100px" mb="10px"/>
                <Text color='black'>Personalized</Text>
            </Box>
            <Box textAlign="center" width='289px' height='100px'>
                <Image src={research} width="100px" height="100px" mb="10px"/>
                <Text color='black'>Research Driven</Text>
            </Box>
            <Box textAlign="center" width='289px' height='100px'>
                <Image src={efficiency} width="100px" height="100px" mb="10px"/>
                <Text color='black'>Efficient</Text>
            </Box>
            <Box textAlign="center" width='289px' height='100px'>
                <Image src={help} width="100px" height="100px" mb="10px"/>
                <Text color='black'>Helpful</Text>
            </Box>
        </HStack>

        <HStack>
            <Image src = {sapiens} width='566px' height='500px'/>
            <VStack m='0px'>
                <Text fontSize="50px" fontWeight="bold" width='589px' height='219px' textAlign='left'
                color='black'>
                We saw the need for finding the right pill for you.
                </Text>
                <Text fontSize='30px' color='black' width='589px' height='219px' textAlign='left'> 
                We saw the need for finding the right
                    pill for you.
                </Text>
                <Button borderRadius='30px' color='black' backgroundColor='white' width='90px'>
                    Hi 
                </Button>
            </VStack>   
        </HStack>
      </Box>
    </Flex>
  );
}

export default Benefits;
