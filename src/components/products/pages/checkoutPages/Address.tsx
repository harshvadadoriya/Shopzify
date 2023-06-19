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
  useColorModeValue as mode,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import { useAppDispatch } from "../../../../redux/store";
import { updateAddress } from "../../../../redux/checkoutSliceRedux/checkoutSlice";

const Address = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const submitMenuBgColor = mode("teal.400", "teal.600");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", shippingInfo);
    dispatch(updateAddress(shippingInfo));
    navigate("/payment");
  };

  return (
    <Box marginX={4} marginTop={isScreenFixed ? "10.2rem" : "2rem"}>
      <Center>
        <Heading mt={"2.5rem"} color="teal" my={2}>
          Shipment
        </Heading>
      </Center>
      <Flex justify="center" py={isScreenFixed ? 10 : 0}>
        <Box justifyContent={"space-between"} w="6xl">
          <Stack direction={["column", "column", "row"]} spacing={8}>
            <Box flex={1} order={isScreenFixed ? 1 : 2}>
              <Text
                fontSize={"3xl"}
                fontWeight={"bold"}
                mb={6}
                mt={isScreenFixed ? 0 : 5}
              >
                Shipping Information
              </Text>
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
                      type="number"
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

            <Box
              flex={1}
              maxW={isScreenFixed ? "sm" : "full"}
              height="full"
              borderRadius={"lg"}
              order={isScreenFixed ? 2 : 1}
              padding={5}
              borderWidth={"1px"}
            >
              <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>
                Order Summary
              </Text>
              <CartSummary />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Address;
