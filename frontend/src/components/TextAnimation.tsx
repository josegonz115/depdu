import React from "react";
import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useColorMode,
  Button, 
  ButtonGroup
} from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";

function TextAnimation({
  AnimatedColor = "gray.800",
  AnimatedSequence = [""],
  AnimatedSpeed = 1000,
  BaseColor = "gray.800",
  baseText,
}) {
  const { colorMode } = useColorMode();

  return (
    <Flex maxHeight="250px" alignItems="center" justifyContent="center">
      <Box>
        <Stack display="flex" alignItems="center" justifyContent="center">
          <Text
            fontWeight="bold"
            fontSize="5xl"
            color={BaseColor}
            _dark={{
              color: "appetite_white",
            }}
            width="800px"
            height="250px"
            overflow="hidden"
            textAlign="center"
          >
            {baseText}{" "}
            <TypeAnimation
              sequence={AnimatedSequence.flatMap((text) => [
                text,
                AnimatedSpeed,
              ])}
              wrapper="span"
              speed={50}
              deletionSpeed={65}
              style={{ color: AnimatedColor, display: "inline-block" }}
              repeat={Infinity}
            />
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default TextAnimation;
