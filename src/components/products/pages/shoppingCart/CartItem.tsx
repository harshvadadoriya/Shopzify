import {
  CloseButton,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartProductMeta } from "./CartProductMeta";
import { CartProducts } from "../../../../interfaces/interface";
import CustomNumberInput from "./CustomNumberInput";
import { useState } from "react";
import { updateCartItemQuantity } from "../../../../redux/checkoutSliceRedux/checkoutSlice";
import { useAppDispatch } from "../../../../redux/store";

const CartItem = (props: CartProducts) => {
  const {
    image,
    discountedPrice,
    name,
    productId,
    cartQty,
    category,
    onClickDelete,
  } = props;

  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(cartQty);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const price = discountedPrice * newQuantity;

    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        discountedPrice,
        price,
        image,
        name,
      })
    );
  };

  const totalPrice = discountedPrice * quantity;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
    >
      <CartProductMeta
        name={name}
        category={category}
        image={image}
        discountedPrice={discountedPrice}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <CustomNumberInput
          productId={productId}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
        <HStack spacing="2">
          <Text>
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Text>
        </HStack>
        <CloseButton
          aria-label="remove-product"
          //   bgColor={mode("gray.100", "gray.700")}
          onClick={onClickDelete}
          borderRadius={"lg"}
          mt={"-2.44rem"}
          _hover={{
            bgColor: mode("gray.100", "gray.700"),
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
        p="1"
      >
        <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
          Delete
        </Link>
        <CustomNumberInput
          productId={productId}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
        <Text>
          {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CartItem;
