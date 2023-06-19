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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import { useCreateCheckoutMutation } from "../../../../redux/apiSliceRedux/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  resetCheckout,
  selectCheckout,
} from "../../../../redux/checkoutSliceRedux/checkoutSlice";

const Payment = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const submitMenuBgColor = mode("teal.400", "teal.600");
  const [createCheckout] = useCreateCheckoutMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const checkoutData = useAppSelector(selectCheckout);
  const { cartItems, summary, address } = checkoutData;
  const dispatch = useAppDispatch();

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPaymentInfo((prevPaymentInfo) => ({
      ...prevPaymentInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData = {
      cartItems,
      summary,
      address,
      payment: paymentInfo,
    };
    try {
      await createCheckout(paymentData)
        .unwrap()
        .then((response: any) => {
          const message = response.message || "Something went wrong";
          toast({
            title: message,
            position: "top",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/success");
          dispatch(resetCheckout());
        });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box marginX={4} marginTop={isScreenFixed ? "8.3rem" : "0"}>
      <Center>
        <Heading my={2} mt={"2.5rem"} color="teal">
          Payment Details
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
                Payment Information
              </Text>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Cardholder Name</FormLabel>
                    <Input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <HStack spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Card Number</FormLabel>
                      <Input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Expiration Date</FormLabel>
                      <Input
                        type="text"
                        name="expirationDate"
                        value={paymentInfo.expirationDate}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      type="text"
                      name="cvv"
                      value={paymentInfo.cvv}
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

export default Payment;
