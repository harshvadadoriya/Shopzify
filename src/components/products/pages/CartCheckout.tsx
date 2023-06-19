import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetCartProductsQuery } from "../../../redux/apiSliceRedux/apiSlice";
import CheckoutPage from "./checkoutPages/CheckoutPage";

const CartCheckout = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });

  const { data: cartData } = useGetCartProductsQuery();

  const navigate = useNavigate();

  return (
    <>
      <Box marginX={4} marginTop={isScreenFixed ? "8.3rem" : "0"}>
        <Center>
          <Heading my={2} mt={"2.5rem"} color="teal">
            Shopping Bag
          </Heading>
        </Center>
        {cartData?.cart.products.length === 0 ||
        cartData?.cart.products.length === undefined ? (
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
        ) : (
          <>
            <CheckoutPage />
          </>
        )}
      </Box>
    </>
  );
};

export default CartCheckout;
