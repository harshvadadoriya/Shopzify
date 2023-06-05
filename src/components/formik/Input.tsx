import { Input as ChakraInput, FormLabel, Box } from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Field } from "formik";

const Input = (props: Props) => {
  const { label, name, ...rest } = props;
  return (
    <Box marginY={2}>
      <FormLabel htmlFor={name} color="teal.600">
        {label}
      </FormLabel>
      <Field
        as={ChakraInput}
        id={name}
        name={name}
        color={"gray.500"}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </Box>
  );
};

export default Input;
