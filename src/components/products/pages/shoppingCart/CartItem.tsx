import {
  Button,
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { ProductFormValues } from "../../../../interfaces/interface";
import CustomNumberInput from "./CustomNumberInput";

type CartItemProps = {
  isGiftWrapping?: boolean;
  name: string;
  description: string;
  quantity: number;
  price: string;
  currency: string;
  imageUrl: string;
  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

export const CartItem = (props: ProductFormValues) => {
  const {
    _id,
    image,
    name,
    discountedPrice,
    originalPrice,
    description,
    quantity,
    gender,
    category,
  } = props;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
      borderWidth="1px"
      borderRadius="lg"
    >
      <CartProductMeta name={name} description={gender} image={image} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <CustomNumberInput />
        <PriceTag price={discountedPrice} />
        <CloseButton aria-label="remove-product" />
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
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <CustomNumberInput />
        <PriceTag price={discountedPrice}></PriceTag>
      </Flex>
    </Flex>
  );
};
