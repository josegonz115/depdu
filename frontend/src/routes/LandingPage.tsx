import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Intro from '../components/Intro';
import Benefits from '../components/Benefits';

function LandingPage() {
  return (
    <VStack spacing={0}>
      <Box>
        <Intro/>
      </Box>
      <Box mt="20px">
        <Benefits/>
      </Box>
    </VStack>
  );
}

export default LandingPage;
