import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {
  selectQuantity,
  selectSummary,
} from "../../../../redux/checkoutSliceRedux/checkoutSlice";
import { useAppSelector } from "../../../../redux/store";

const CartSummary = () => {
  const cartItems = useAppSelector(selectQuantity);
  const cartSummary = useAppSelector(selectSummary);
  return (
    <>
      {cartItems.map((item) => (
        <Box
          borderWidth={1}
          borderRadius="md"
          p={2}
          key={item.productId}
          mb={2}
          display="flex"
          alignItems="center"
        >
          <Image src={item.image} boxSize={100} mr={2} borderRadius={4} />
          <Box>
            <Text
              fontSize="md"
              fontWeight="bold"
              mb={1}
              color={mode("teal.500", "teal.400")}
            >
              {item.name}
            </Text>
            <Text fontSize="sm" mb={1} color={mode("gray.600", "gray.400")}>
              <b>Price:</b>{" "}
              {`${item.discountedPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}`}
            </Text>
            <Text fontSize="sm" mb={1} color={mode("gray.600", "gray.400")}>
              <b>Quantity: </b>
              {item.quantity}
            </Text>
            <Text fontSize="sm" mb={1} color={mode("gray.600", "gray.400")}>
              <b>Subtotal:</b>{" "}
              {`${item.price.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}`}
            </Text>
          </Box>
        </Box>
      ))}
      <Box color={mode("gray.600", "gray.400")} mt={3}>
        <Flex my={1} fontSize={"sm"} justify="space-between">
          <Text>Total MRP</Text>
          <Text color={mode("teal.500", "teal.400")} ml={1}>
            {cartSummary.totalMrp.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Text>
        </Flex>
        <Flex my={1} fontSize={"sm"} justify="space-between">
          <Text>Tax Charge</Text>
          <Text color={mode("teal.500", "teal.400")} ml={1}>
            +
            {cartSummary.taxCharge.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Text>
        </Flex>
        <Flex my={1} fontSize={"sm"} justify="space-between">
          <Text>Shipping Charge</Text>
          <Text color={mode("teal.500", "teal.400")} ml={1}>
            +
            {cartSummary.shippingCharge.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Text>
        </Flex>
        <Divider />
        <Flex my={1} fontSize={"lg"} justify="space-between">
          <Text fontWeight={"bold"}> Total Amount</Text>
          <Text color={mode("teal.500", "teal.400")} ml={1}>
            {cartSummary.totalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default CartSummary;
