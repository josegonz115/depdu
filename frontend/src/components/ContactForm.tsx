
import React, { useState } from "react";
import connect from "../images/connect.png";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  Text,
  Image,
} from "@chakra-ui/react";

function YellowCircleBackground() {
  return (
    <Box
      position="absolute"
      zIndex="-1"
      left="50%"
      transform="translateX(-50%)"
      bottom="0"
      width="100%"
    >
      <Box
        position="absolute"
        top="-875px"
        left="5%"
        width="550px"
        height="500px"
        borderRadius="50%"
        background="radial-gradient(45.49% 45.49% at 50% 50%, #DBB6CC 0%, #FFF 100%)"
      />
      <Box
        position="absolute"
        top="-650px"
        left="25%"
        width="464px"
        height="464px"
        borderRadius="50%"
        mixBlendMode="multiply"
        background="radial-gradient(45.49% 45.49% at 50% 50%, #CEA7E0 0%, #FFF 100%)"
      />
      <Box
        position="absolute"
        top="-600px"
        left="0%"
        width="590px"
        height="590px"
        borderRadius="50%"
        mixBlendMode="multiply"
        background="radial-gradient(45.49% 45.49% at 50% 50%, pink 0%, #FFF 100%)"
      />
    </Box>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = "Must be a name";
    if (!email) newErrors.email = "Must input email address";
    if (!message) newErrors.message = "No message filled out";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log("Form submitted", { name, email, message });
      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(true);
    }
  };

  const isFormValid = name && email && message;

  return (
    <Container
      maxW="full"
      mt={30}
      centerContent
      overflow="hidden"
      position="relative"
    >
      <YellowCircleBackground />
      <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
        <Box
          borderRadius="lg"
          m={{ lg: 10, md: 16, sm: 4 }}
          p={{ lg: 16, md: 5, sm: 5 }}
        >
          <Box>
            <Wrap spacing={{ base: 20, lg: 20, md: 5, sm: 3 }}>
              <WrapItem>
                <Box borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5} as="form" onSubmit={handleSubmit}>
                      <Heading
                        fontSize="50px"
                        fontWeight="bold"
                        pb="15px"
                        bgGradient="linear(to-r, purple.400, pink.400)"
                        bgClip="text"
                      >
                        Let&apos;s connect!
                      </Heading>

                      {submitted && (
                        <Text color="green.500" fontWeight="bold">
                          Submitted!
                        </Text>
                      )}

                      <FormControl id="name" isInvalid={errors.name} isRequired>
                        <InputGroup borderColor="#838383">
                          <InputLeftElement pointerEvents="none" />
                          <Input
                            backgroundColor="#FFFCF7"
                            color="#7F7F7F"
                            type="text"
                            size="md"
                            placeholder="Full name *"
                            fontSize="20px"
                            fontWeight="bold"
                            height="70px"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </InputGroup>
                        {errors.name && (
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl
                        id="email"
                        isInvalid={errors.email}
                        isRequired
                      >
                        <InputGroup borderColor="#838383">
                          <InputLeftElement pointerEvents="none" />
                          <Input
                            backgroundColor="#FFFCF7"
                            color="#7F7F7F"
                            type="email"
                            size="md"
                            placeholder="Email Address *"
                            fontSize="20px"
                            fontWeight="bold"
                            height="70px"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                        {errors.email && (
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl
                        id="message"
                        isInvalid={errors.message}
                        isRequired
                        width="547px"
                        height="277px"
                      >
                        <Textarea
                          borderColor="#838383"
                          backgroundColor="#FFFCF7"
                          placeholder="How can we assist you? *"
                          p="25px 0px 0px 40px"
                          fontWeight="bold"
                          color="#7F7F7F"
                          fontSize="20px"
                          height="277px"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        {errors.message && (
                          <FormErrorMessage>{errors.message}</FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl
                        id="submit"
                        display="flex"
                        justifyContent="center"
                        pt="15px"
                      >
                        <Button
                          type="submit"
                          variant="solid"
                          bg="#AD8DD3"
                          color="white"
                          borderRadius="10px"
                          p="25px 25px 25px 25px"
                          boxShadow="2px 3px 4.3px 0px rgba(0, 0, 0, 0.25)"
                          _hover={{}}
                          disabled={!isFormValid}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
        <Box m={8}>
          <Image src={connect} alt="Team Up" pr='30px'/>
        </Box>
      </Flex>
    </Container>
  );
}

export default ContactForm;
