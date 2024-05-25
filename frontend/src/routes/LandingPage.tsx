import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Intro from '../components/Intro';
import Benefits from '../components/Benefits';
import ContactForm from '../components/ContactForm';

function LandingPage() {
  return (
    <VStack spacing={0}>
      <Box height='150vh'>
        <Intro/>
      </Box>
      <Box mt="20px">
        <Benefits/>
      </Box>
      <Box>
        <ContactForm/>
      </Box>
    </VStack>
  );
}

export default LandingPage;
