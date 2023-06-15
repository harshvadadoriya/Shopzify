import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { useState } from "react";

const Address = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const submitMenuBgColor = useColorModeValue("teal.400", "teal.600");

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prevShippingInfo) => ({
      ...prevShippingInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", shippingInfo);
  };

  return (
    <Box marginX={4} marginTop={isScreenFixed ? "10rem" : "0"}>
      <Center>
        <Text
          fontWeight="bold"
          fontSize="3xl"
          my={2}
          mt={"2.5rem"}
          color="teal"
        >
          Shipment
        </Text>
      </Center>
      <Flex justify="center" py={10}>
        <Box maxW="container.xl" w="full">
          <Stack direction={["column", "column", "row"]} spacing={8}>
            <Box flex={1}>
              <Heading mb={6}>Shipping Information</Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <HStack spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <HStack spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>City</FormLabel>
                      <Input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Country</FormLabel>
                      <Select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </Select>
                    </FormControl>
                  </HStack>

                  <HStack spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Postal Code</FormLabel>
                      <Input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleChange}
                    />
                  </FormControl>
                </VStack>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mt={4}
                  color="white"
                  bgColor={submitMenuBgColor}
                  _hover={{
                    bgColor: "teal.500",
                  }}
                >
                  Submit & Next
                </Button>
              </form>
            </Box>

            <Box flex={1}>
              <Heading mb={6}>Order Summary</Heading>
              <Box borderWidth={1} borderRadius="md" p={4}>
                <Text mb={4}>Product Name</Text>
                <Text mb={4}>Price</Text>
                <Text mb={4}>Quantity</Text>
                <Text mb={4}>Subtotal</Text>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Address;
