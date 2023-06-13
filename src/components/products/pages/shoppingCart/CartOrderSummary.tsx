import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const buttonBgColor = useColorModeValue("teal.600", "teal.500");

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal">{formatPrice(577)}</OrderSummaryItem>
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#">{formatPrice(20)}</Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(597)}
          </Text>
        </Flex>
      </Stack>
      <Button
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        colorScheme="teal"
        bg={buttonBgColor}
        color={"white"}
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
      >
        Checkout
      </Button>
    </Stack>
  );
};
