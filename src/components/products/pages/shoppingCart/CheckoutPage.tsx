import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { cartData } from "../../../../constants/_data";
import { useGetCartProductsQuery } from "../../../../redux/apiSliceRedux/apiSlice";

const CheckoutPage = () => {
  const { data: cartData } = useGetCartProductsQuery();
  return (
    <>
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
        userSelect="none"
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart (3 items)
            </Heading>

            <Stack spacing="6">
              {cartData?.cart.products.map((item) => (
                <CartItem key={item._id} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            {/* <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <NavLink to="/">
                <Text color={mode("teal.500", "teal.400")}>
                  Continue shopping
                </Text>
              </NavLink>
            </HStack> */}
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default CheckoutPage;
