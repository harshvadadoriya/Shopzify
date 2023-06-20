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
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import { useAppDispatch } from "../../../../redux/store";
import { updateAddress } from "../../../../redux/checkoutSliceRedux/checkoutSlice";
import { AddressDetails } from "../../../../interfaces/interface";
import FormikControl from "../../../formik/FormikControl";

const Address = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const submitMenuBgColor = mode("teal.400", "teal.600");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValue: AddressDetails = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "+91 ",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string()
      .matches(
        /^[a-zA-Z\s]{15,}$/,
        "Address must be at least 15 characters long"
      )
      .required("Address is required"),
    country: Yup.string().required("Country name is required"),
    state: Yup.string().required("State name is required"),
    city: Yup.string().required("City name is required"),
    postalCode: Yup.string()
      .matches(/^\d{6}$/, "Postal Code must be 6 digits")
      .required("Postal Code is required"),
    email: Yup.string()
      .email("Email is invalid")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(\+91[\s]?)?[0]?(91)?[789]\d{9}$/,
        "Please enter valid indian phone number"
      )
      .required("Phone number is required"),
  });

  const onSubmit = async (values: AddressDetails) => {
    dispatch(updateAddress(values));
    navigate("/payment");
  };

  return (
    <Box marginX={4} marginTop={isScreenFixed ? "10.2rem" : "2rem"}>
      <Center>
        <Heading mt={"2.5rem"} className="text-teal-600" my={2}>
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
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <Form>
                    <VStack spacing={4}>
                      <HStack spacing={4} w="full">
                        <FormikControl
                          control="input"
                          type="text"
                          label="First Name"
                          name="firstName"
                          placeholder="Enter your First Name"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Last Name"
                          name="lastName"
                          placeholder="Enter your Last Name"
                        />
                      </HStack>
                      <FormikControl
                        control="textarea"
                        type="text"
                        label="Address"
                        name="address"
                        placeholder="Enter your Address"
                      />
                      <HStack spacing={4} w="full">
                        <FormikControl
                          control="input"
                          label="Country"
                          name="country"
                          placeholder="Enter your Country"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="State"
                          name="state"
                          placeholder="Enter your State"
                        />
                      </HStack>
                      <HStack spacing={4} w="full">
                        <FormikControl
                          control="input"
                          type="text"
                          label="City"
                          name="city"
                          placeholder="Enter your City"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Postal Code"
                          name="postalCode"
                          placeholder="Enter your Postal Code"
                        />
                      </HStack>
                      <HStack spacing={4} w="full">
                        <FormikControl
                          control="input"
                          type="text"
                          label="Email"
                          name="email"
                          placeholder="Enter your Email"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Phone Number"
                          name="phone"
                          placeholder="Enter your phone"
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
                      Submit & Next
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

export default Address;
