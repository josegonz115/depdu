import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import Intro from '../components/Intro';
import Benefits from '../components/Benefits';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <VStack spacing={0}>
      <Box height='100vh'>
        <Intro/>
      </Box>
      <Box mt="20px">
        <Benefits/>
      </Box>
      <Box>
        <ContactForm/>
      </Box>
      <Footer/>
    </VStack>
  );
}

export default LandingPage;
