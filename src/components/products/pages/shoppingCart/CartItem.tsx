import { CloseButton, Flex, HStack, Link, Text } from "@chakra-ui/react";
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
    console.log(quantity);
    const price = parseInt(discountedPrice) * newQuantity;
    console.log(price);

    dispatch(
      updateCartItemQuantity({ productId, quantity: newQuantity, price })
    );
  };

  const totalPrice = parseInt(discountedPrice) * quantity;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
    >
      <CartProductMeta name={name} category={category} image={image} />

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
        <CloseButton aria-label="remove-product" onClick={onClickDelete} />
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
