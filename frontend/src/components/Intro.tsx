import React from 'react'; 
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import TextAnimation from './TextAnimation';

function YellowCircleBackground() {
  return (
    <Box
      position="absolute"
      zIndex="-1"
      left="50%"
      transform="translateX(-50%)"
      top="-1600px" // Adjust the top value to position the circle
      width="2150px"
      height="2150px"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-100px"
        left="50%"
        transform="translateX(-50%)"
        width="2100px"
        height="2100px"
        borderRadius="50%"
        background="#FCF9FF"
        boxShadow="0px 43px 61.3px 0px rgba(226, 206, 255, 1)"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="-100px"
        left="50%"
        transform="translateX(-50%)"
        width="2100px"
        height="2100px"
        borderRadius="50%"
        background="radial-gradient(45.49% 45.49% at 50% 50%, purple 0%, #FFF 100%)"
        mixBlendMode="multiply"
        zIndex="0"
      />
    </Box>
  );
}

function Intro() {
  return (
    <Flex position="relative" justifyContent="center" alignItems="center" height="70vh">
      <Box pt="50px" textAlign="center" position="relative">
        
        <TextAnimation 
            AnimatedSequence={[
              "contraceptives near me.",
              "information about my body.",
              "birth control recommendations.",
            ]}
            baseText="I'm looking for"
            AnimatedSpeed={2000}
            AnimatedColor="#786AF4"
            BaseColor="black"
          />
        <YellowCircleBackground />
      </Box>
    </Flex>
  );
}

export default Intro;
