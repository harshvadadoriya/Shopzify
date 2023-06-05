import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "../../formik/FormikControl";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { UserRegAuthFormValues } from "../../../interfaces/interface";
import { NavLink } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";

const Signup = () => {
  const toast = useToast();
  const submitMenuBgColor = useColorModeValue("teal.400", "teal.600");
  const resetMenuBgColor = useColorModeValue("red.400", "red.600");

  const initialValue: UserRegAuthFormValues = {
    name: "",
    email: "",
    phone: "+91 ",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]{15,}$/, "Name must be at least 15 characters long")
      .required("Name is required"),
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
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords does not match")
      .required("Confirm Password is required"),
  });
  const onSubmit = async (
    values: UserRegAuthFormValues,
    onSubmitProps: FormikHelpers<UserRegAuthFormValues>
  ) => {
    onSubmitProps.resetForm();
    console.log(values);
    toast({
      title: "You have successfully logged in",
      position: "top",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      mx="3"
    >
      <Box
        width={"3xl"}
        boxShadow="lg"
        padding={6}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Box>
          <Flex fontSize={50} alignItems="center">
            <Text>
              <AiFillShop fontSize={50} fill="teal" />
            </Text>
            <Text fontFamily={"cursive"} color="teal" marginX={1}>
              Shopzify
            </Text>
          </Flex>
          <Text fontSize="3xl" my={3} color="gray.600">
            Register
          </Text>
        </Box>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="name"
                placeholder="Enter your name"
              />
              <FormikControl
                control="input"
                type="text"
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <FormikControl
                control="input"
                type="text"
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone"
              />
              <FormikControl
                control="input"
                type="text"
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              <FormikControl
                control="input"
                type="text"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
              <Box textAlign="left">
                <Button
                  type="submit"
                  colorScheme="teal"
                  color="white"
                  bgColor={submitMenuBgColor}
                  marginY={4}
                  _hover={{
                    bgColor: "teal.500",
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  colorScheme="red"
                  color="white"
                  bgColor={resetMenuBgColor}
                  marginY={4}
                  marginX={2}
                  _hover={{
                    bgColor: "red.500",
                  }}
                >
                  Reset
                </Button>
              </Box>
              <Box className="mt-1">
                <Text>
                  Already have an account?
                  <NavLink className="ml-2 text-teal-500 font-bold" to="/login">
                    Login here
                  </NavLink>
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Signup;
