import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue as mode,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/store';
import { selectQuantity } from '../../../../redux/checkoutSliceRedux/checkoutSlice';

type OrderSummaryItemProps = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
	const { label, value, children } = props;
	return (
		<Flex justify="space-between" fontSize="sm">
			<Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
				{label}
			</Text>
			{value ? <Text fontWeight="medium">{value}</Text> : children}
		</Flex>
	);
};

export const CartOrderSummary = () => {
	const buttonBgColor = useColorModeValue('teal.600', 'teal.500');
	const isNavbarFixed = useBreakpointValue({ base: false, lg: true });

	const cartItems = useAppSelector(selectQuantity);

	const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

	const shippingAndTax = 40;
	const total = subtotal + shippingAndTax;

	return (
		<Box
			position={isNavbarFixed ? 'fixed' : 'static'}
			top={'17rem'}
			width="20rem"
			zIndex={10}
		>
			<Stack spacing="5" borderWidth="1px" rounded="lg" padding="8">
				<Heading size="md">Order Summary</Heading>

				<Stack spacing="6">
					<OrderSummaryItem label="Subtotal">
						<Text>
							{subtotal.toLocaleString('en-US', {
								style: 'currency',
								currency: 'INR',
							})}
						</Text>
					</OrderSummaryItem>
					<OrderSummaryItem label="Shipping + Tax">
						<Link href="#">
							<Text>
								{shippingAndTax.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</Text>
						</Link>
					</OrderSummaryItem>
					<Flex justify="space-between">
						<Text fontSize="lg" fontWeight="semibold">
							Total
						</Text>
						<Text fontSize="xl" fontWeight="extrabold">
							{total.toLocaleString('en-US', {
								style: 'currency',
								currency: 'INR',
							})}
						</Text>
					</Flex>
				</Stack>
				<NavLink to="/address">
					<Button
						size="lg"
						width={'full'}
						fontSize="md"
						rightIcon={<FaArrowRight />}
						colorScheme="teal"
						bg={buttonBgColor}
						color={'white'}
						textTransform={'uppercase'}
						_hover={{
							transform: 'translateY(2px)',
							boxShadow: 'lg',
						}}
					>
						Checkout
					</Button>
				</NavLink>
				<NavLink to="/">
					<Center>
						<Text>or</Text>
						<Text
							color={mode('teal.500', 'teal.400')}
							display="flex"
							justifyContent={'center'}
							textAlign="center"
							ml={1}
						>
							Continue shopping
						</Text>
					</Center>
				</NavLink>
			</Stack>
		</Box>
	);
};
