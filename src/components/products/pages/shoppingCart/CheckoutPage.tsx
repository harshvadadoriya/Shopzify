import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import CartItem from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import {
  useGetCartProductsQuery,
  useRemoveFromCartMutation,
} from "../../../../redux/apiSliceRedux/apiSlice";
import { useAppDispatch } from "../../../../redux/store";
import { removeCart } from "../../../../redux/checkoutSliceRedux/checkoutSlice";

const CheckoutPage = () => {
  const { data: cartData } = useGetCartProductsQuery();
  const dispatch = useAppDispatch();

  const [removeFromCart] = useRemoveFromCartMutation();
  const toast = useToast();

  const handleRemoveFromCart = async (productId: string) => {
    const product = cartData?.cart.products.find(
      (item) => item.productId === productId
    );

    if (product) {
      try {
        await removeFromCart({ product })
          .unwrap()
          .then((response: any) => {
            const message = response?.message || "Something went wrong";
            toast({
              title: message,
              status: "success",
              position: "top",
              duration: 2000,
              isClosable: true,
            });
            dispatch(removeCart(productId));
          });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

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
              Shopping Cart ({cartData?.cart.products.length} items)
            </Heading>

            <Stack spacing="6">
              {cartData?.cart.products.map((item) => (
                <CartItem
                  key={item._id}
                  cartQty={parseInt(item.quantity)}
                  {...item}
                  onClickDelete={() => handleRemoveFromCart(item.productId)}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default CheckoutPage;
