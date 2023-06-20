import {
	Badge,
	Box,
	Center,
	HStack,
	Text,
	VStack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useGetCheckoutQuery } from '../../../../redux/apiSliceRedux/apiSlice';
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GetCheckoutData } from '../../../../interfaces/interface';

const OrderPage = () => {
	const isScreenFixed = useBreakpointValue({ base: false, md: true });
	const {
		data: checkouts,
		isLoading,
		isError,
		isFetching,
	} = useGetCheckoutQuery();
	const isTableResponsive = useBreakpointValue({ base: false, sm: true });
	const navigate = useNavigate();
	const handleClick = (order: GetCheckoutData) => {
		navigate(`/order/${order._id}`, { state: { order } });
	};

	if (isLoading) {
		return (
			<Center marginTop={isScreenFixed ? '12rem' : '2rem'}>
				<Text>Please wait, We are fetching your order details!</Text>
			</Center>
		);
	}

	const formatDate = (date: string) => {
		return new Date(date).toLocaleString('en-IN');
	};

	return (
		<Box
			overflowX="auto"
			marginTop={isScreenFixed ? '12rem' : '2rem'}
			width={'90%'}
			mx={'auto'}
		>
			{checkouts?.length === 0 ? (
				<Center>
					<VStack>
						<Text fontWeight={600}>You have not made any purchase yet</Text>
						<HStack>
							<Text
								as="button"
								color="teal.500"
								fontWeight="600"
								onClick={() => navigate('/')}
							>
								Click here
							</Text>
							<Text>to Continue Shopping</Text>
						</HStack>
					</VStack>
				</Center>
			) : (
				<Table variant="simple" size={isTableResponsive ? 'sm' : 'md'}>
					<Thead>
						<Tr>
							<Th pb={3} fontSize={'lg'}>
								#Order Id
							</Th>
							<Th fontSize={'lg'}>Order Status</Th>
							<Th fontSize={'lg'}>Order Price</Th>
							<Th fontSize={'lg'}>Order Date & Time</Th>
						</Tr>
					</Thead>
					<Tbody>
						{checkouts?.map((checkout) => (
							<Tr key={checkout._id}>
								<Td fontSize={'md'}>
									<Text
										color={'blue.500'}
										onClick={() => handleClick(checkout)}
										cursor={'pointer'}
										width={'max'}
									>
										{checkout._id}
									</Text>
								</Td>

								<Td fontSize={'md'}>
									<Badge
										rounded="md"
										fontSize="0.8em"
										colorScheme="red"
										color="red.500"
										bgColor="red.100"
									>
										Order Received
									</Badge>
								</Td>
								{checkout.summary.map((item, ind) => (
									<Td fontSize={'md'} key={ind}>
										{item.totalAmount.toLocaleString('en-US', {
											style: 'currency',
											currency: 'INR',
										})}
									</Td>
								))}

								<Td fontSize={'md'}>{formatDate(checkout.recordDate)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}
		</Box>
	);
};

export default OrderPage;
