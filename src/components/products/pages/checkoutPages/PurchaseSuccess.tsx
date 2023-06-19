import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const PurchaseSuccess: React.FC = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();
  return (
    <Box
      maxW="md"
      mx="auto"
      marginTop={isScreenFixed ? "12rem" : "0"}
      py={8}
      px={5}
      borderWidth={1}
      borderRadius="md"
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
    >
      <VStack spacing={4} align="center">
        <Icon as={CheckCircleIcon} boxSize={20} color="teal.500" />
        <Heading as="h1" size="xl">
          Thank you for your purchase!
        </Heading>
        <Text>Your order has been successfully placed.</Text>
        <Button colorScheme="teal" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </VStack>
    </Box>
  );
};

export default PurchaseSuccess;
