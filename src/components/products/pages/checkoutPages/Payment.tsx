import { Formik, Form } from "formik";
import * as Yup from "yup";
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
import { useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import { useCreateCheckoutMutation } from "../../../../redux/apiSliceRedux/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import {
  resetCheckout,
  selectCheckout,
} from "../../../../redux/checkoutSliceRedux/checkoutSlice";
import { cardDetails } from "../../../../interfaces/interface";
import FormikControl from "../../../formik/FormikControl";

const Payment = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const submitMenuBgColor = mode("teal.400", "teal.600");
  const [createCheckout] = useCreateCheckoutMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const checkoutData = useAppSelector(selectCheckout);
  const { cartItems, summary, address } = checkoutData;
  const dispatch = useAppDispatch();

  const initialValue: cardDetails = {
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };
  const validationSchema = Yup.object({
    cardName: Yup.string()
      .required("Cardholder name is required")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Cardholder name must contain only letters and spaces"
      ),
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be a 16-digit number"),
    expirationDate: Yup.string()
      .required("Expiration date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "Expiration date must be in the format MM/YY"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be a 3-digit number"),
  });

  const onSubmit = async (values: cardDetails) => {
    const paymentData = {
      cartItems,
      summary,
      address,
      payment: values,
    };
    try {
      await createCheckout(paymentData)
        .unwrap()
        .then((response: any) => {
          toast({
            title: response.message || "Something went wrong",
            description: response.subMessage || "Something went wrong",
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
        <Heading my={2} mt={"2.5rem"} className="text-teal-600">
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
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <VStack spacing={4}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Card Holder Name"
                        name="cardName"
                        placeholder="Enter your Name as per the Card"
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Card Number"
                        name="cardNumber"
                        placeholder="Enter your Card Number"
                      />
                      <HStack spacing={4} w="full">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Expiration Date"
                          name="expirationDate"
                          placeholder="MM/YY"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="CVV"
                          name="cvv"
                          placeholder="XXX"
                        />
                      </HStack>
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
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
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
