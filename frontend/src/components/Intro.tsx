import React from 'react'; 
import { Box, Text, Flex } from "@chakra-ui/react";

function YellowCircleBackground() {
  return (
    <Box
      position="absolute"
      zIndex="-1"
      left="50%"
      transform="translateX(-50%)"
      bottom="0"
      width="200vh"
      height="170vh"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-1050px"
        left="50%"
        transform="translateX(-50%)"
        width="2150px"
        height="2150px"
        borderRadius="50%"
        background="#FCF9FF"
        boxShadow="0px 43px 61.3px 0px rgba(173, 58, 58, 0.20)"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="-880px"
        left="50%"
        transform="translateX(-50%)"
        width="2150px"
        height="2150px"
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
    <Flex position="relative" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box pt="100px" textAlign="center">
        <Flex 
          width="270px" 
          height="38px" 
          backgroundColor="#C8C8C8" 
          opacity="40%"
          borderRadius="30px"  
          mb="10px"
          alignItems="center"
          justifyContent="center"
        > 
          <Text fontWeight="bold" color="#6100A2">Our Story</Text>
        </Flex>
        <Text fontWeight="bold" fontSize="60px" color="black" width="672px" height="146px">
          Connecting customers through technology 
        </Text>
        <YellowCircleBackground/>
      </Box>
    </Flex>
  );
}

export default Intro;
