import React from 'react'; 
import { Box, Text, Flex, Image, HStack, VStack, Button } from "@chakra-ui/react";
import personalization from '../images/personalization.png';
import research from '../images/research.png';
import help from '../images/help.png';
import efficiency from '../images/efficiency.png';
import sapiens from '../images/sapiens.png';

function Benefits() {
  return (
    <Flex justifyContent="center" alignItems="center" backgroundColor="pink" width="100vw" py="40px">
      <Box textAlign="start" width="80%">
        <Text fontSize="50px" mb="40px" fontWeight="bold" color="black" textAlign="center">
          Discover the benefits
        </Text>
        
        <HStack spacing="40px" justifyContent="space-between" mb="60px">
          {[
            { src: personalization, text: "Personalized" },
            { src: research, text: "Research Driven" },
            { src: efficiency, text: "Efficient" },
            { src: help, text: "Helpful" }
          ].map((item, index) => (
            <VStack key={index} textAlign="center" width="200px" alignItems="center">
              <Image src={item.src} boxSize="80px" mb="10px" />
              <Text color="black">{item.text}</Text>
            </VStack>
          ))}
        </HStack>

        <HStack spacing="40px" alignItems="flex-start">
          <Image src={sapiens} boxSize="400px" objectFit="cover" />
          <VStack align="start" spacing="20px">
            <Text fontSize="36px" fontWeight="bold" color="black">
              We saw the need for finding the right pill for you.
            </Text>
            <Text fontSize="24px" color="black">
              We saw the need for finding the right pill for you.
            </Text>
            <Button borderRadius="30px" color="black" backgroundColor="white" width="150px">
              Get Started!
            </Button>
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Benefits;
