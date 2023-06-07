import { Box, Center, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CartCheckout = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });

  const navigate = useNavigate();

  return (
    <>
      <Box marginX={4} marginTop={isScreenFixed ? "8.3rem" : "0"}>
        <Center>
          <Text fontWeight="bold" fontSize="3xl" my={2} mt={"2.5rem"}>
            Shopping Bag
          </Text>
        </Center>

        <Center flexDirection="column" mt={8}>
          <Text fontSize="lg" fontWeight="bold">
            Hey, it feels so light!
          </Text>
          <Flex mt={1} className="items-center">
            <Text>
              There is nothing in your bag. Let's add some items.{" "}
              <Text
                as="button"
                color="teal.500"
                fontWeight="600"
                onClick={() => navigate("/")}
              >
                Click here
              </Text>
            </Text>
          </Flex>
        </Center>
      </Box>
    </>
  );
};

export default CartCheckout;
