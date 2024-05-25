import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Intro from '../components/Intro';
import Benefits from '../components/Benefits';

function LandingPage() {
  return (
    <VStack spacing={0} width="100%">
      <Box width="100%" height="100vh">
        <Intro/>
      </Box>
      <Box width="100%" mt="20px">
        <Benefits/>
      </Box>
    </VStack>
  );
}

export default LandingPage;
