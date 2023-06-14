import { CloseButton, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { CartProductMeta } from './CartProductMeta';
import { CartProducts } from '../../../../interfaces/interface';
import CustomNumberInput from './CustomNumberInput';

export const CartItem = (props: CartProducts) => {
	const {
		image,
		name,
		discountedPrice,
		productId,
		cartQty,
		category,
		onClickDelete,
	} = props;

	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
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
				display={{ base: 'none', md: 'flex' }}
			>
				<CustomNumberInput productId={productId} quantity={cartQty} />
				<HStack spacing="2">
					<Text>₹{discountedPrice}</Text>
				</HStack>
				<CloseButton aria-label="remove-product" onClick={onClickDelete} />
			</Flex>

			{/* Mobile */}
			<Flex
				mt="4"
				align="center"
				width="full"
				justify="space-between"
				display={{ base: 'flex', md: 'none' }}
				p="1"
			>
				<Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
					Delete
				</Link>
				<CustomNumberInput productId={productId} quantity={cartQty} />
				<Text>₹{discountedPrice}</Text>
			</Flex>
		</Flex>
	);
};
