import React from 'react'; 
import { Box, Text, Flex, Image, HStack, VStack, Button, keyframes } from "@chakra-ui/react";
import personalization from '../images/personalization.png';
import research from '../images/research.png';
import help from '../images/help.png';
import efficiency from '../images/efficiency.png';
import sapiens from '../images/sapiens.png';

// Define keyframes for the gradient circle animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function Benefits() {
  return (
    <Flex justifyContent="center" alignItems="center" backgroundColor="white" width="100vw" py="40px">
      <Box textAlign="start" width="80%">
        <Text
          fontSize="50px"
          fontWeight="bold"
          pb="30px"
          bgGradient="linear(to-r, purple.400, pink.400)"
          bgClip="text"
          pl='50px'
        >
          Discover the benefits
        </Text>
        
        <HStack spacing="20px" justifyContent="space-between" mb="60px">
          {[
            { src: personalization, text: "Personalized" },
            { src: research, text: "Research Driven" },
            { src: efficiency, text: "Efficient" },
            { src: help, text: "Helpful" }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <VStack textAlign="center" width="200px" alignItems="center">
                <Image src={item.src} boxSize="80px" mb="10px" />
                <Text color="black">{item.text}</Text>
              </VStack>
              {index < 3 && ( // Add gradient line between items, but not after the last item
                <Box
                  height="90px"
                  width="5px"
                  bgGradient="linear(to-b, pink.400, purple.400)"
                  borderRadius='15px'
                />
              )}
            </React.Fragment>
          ))}
        </HStack>

        <HStack spacing="40px" alignItems="center">
          <Image src={sapiens} boxSize="400px" objectFit="cover" />
          <VStack align="start" spacing="20px">
            <Text fontSize="36px" fontWeight="bold" color="black" >
              Don't know where to start? We got you!
            </Text>
            <Text fontSize="24px" color="black" pb='15px'>
              Lean more about your human body and find resources catered to your needs. A community created by women 
              to empower and encourage those who seek outlets of information! ☺
            </Text>
            <Button
              borderRadius="30px"
              color="black"
              backgroundColor="#CEA7E0"
              width="150px"
              overflow="hidden"
              position="relative"
              _hover={{
                _before: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: "linear-gradient(270deg, pink, purple)",
                  backgroundSize: "200% 200%",
                  animation: `${gradientAnimation} 3s ease infinite`,
                  borderRadius: "inherit",
                  zIndex: -1,
                },
                color: "white",
              }}
              ml='225px'
            >
              Get Started!
            </Button>
          </VStack>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Benefits;
