import {
	Box,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useBreakpointValue,
	useSteps,
	Heading,
	Flex,
	Image,
	useColorModeValue as mode,
	Text,
	Divider,
	VStack,
	Stack,
} from '@chakra-ui/react';
import { steps } from '../../../../constants/OrderSteps';
import { useLocation } from 'react-router-dom';
import { GetCheckoutData } from '../../../../interfaces/interface';

const OrderDetails = () => {
	const isScreenFixed = useBreakpointValue({ base: false, md: true });
	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	const { state } = useLocation();
	const orderData: GetCheckoutData = state?.order;

	return (
		<Box marginTop={isScreenFixed ? '12rem' : '2rem'} width={'90%'} mx={'auto'}>
			<Box p={5} borderWidth={1} borderRadius={'md'} my={3}>
				<Box>
					<Heading
						size={'lg'}
						color={mode('teal.600', 'teal.400')}
						userSelect="none"
					>
						Order Id
					</Heading>
					<Text fontSize={'lg'} color="gray.500">
						#{orderData._id}
					</Text>
				</Box>
			</Box>
			<Box p={5} borderWidth={1} borderRadius={'md'} userSelect="none">
				<Box mb={5}>
					<Heading size={'lg'} color={mode('teal.600', 'teal.400')}>
						Order Status
					</Heading>
					<Divider my={3} />
				</Box>
				<Stepper
					index={activeStep}
					orientation="vertical"
					height="400px"
					colorScheme={'teal'}
					gap="0"
				>
					{steps.map((step, index) => (
						<Step key={index}>
							<StepIndicator>
								<StepStatus
									complete={<StepIcon />}
									incomplete={<StepNumber />}
									active={<StepNumber />}
								/>
							</StepIndicator>

							<Box flexShrink="0">
								<StepTitle>{step.title}</StepTitle>
								<StepDescription>{step.description}</StepDescription>
							</Box>

							<StepSeparator />
						</Step>
					))}
				</Stepper>
			</Box>
			<Box p={5} borderWidth={1} borderRadius={'md'} my={3}>
				<Box mb={5}>
					<Heading size={'lg'} color={mode('teal.600', 'teal.400')}>
						Order Details
					</Heading>
					<Divider my={3} />
				</Box>
				{orderData.cartItems.map((prodItem) => (
					<Flex my={3} key={prodItem._id}>
						<Image src={prodItem.image} boxSize={100} mr={2} borderRadius={4} />
						<Box fontSize={isScreenFixed ? 'md' : 'sm'}>
							<Text
								fontSize={isScreenFixed ? 'md' : 'sm'}
								fontWeight="bold"
								mb={1}
								color={mode('teal.500', 'teal.400')}
							>
								{prodItem.name}
							</Text>
							<Text mb={1} color={mode('gray.600', 'gray.400')}>
								<b>Price:</b>{' '}
								{`${prodItem.discountedPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}`}
							</Text>
							<Text mb={1} color={mode('gray.600', 'gray.400')}>
								<b>Quantity: </b>
								{prodItem.quantity}
							</Text>
							<Text mb={1} color={mode('gray.600', 'gray.400')}>
								<b>Subtotal:</b>{' '}
								{`${prodItem.price.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}`}
							</Text>
						</Box>
					</Flex>
				))}
			</Box>
			<Box p={5} borderWidth={1} borderRadius={'md'} my={3}>
				<Box mb={5}>
					<Heading size={'lg'} color={mode('teal.600', 'teal.400')}>
						Shipping Details
					</Heading>
					<Divider my={3} />
				</Box>
				{orderData.address.map((addressItem, ind) => (
					<Box color={mode('gray.600', 'gray.400')} mt={3} key={ind}>
						<Stack justify={'left'} fontSize={isScreenFixed ? 'md' : 'sm'}>
							<Flex>
								<Text fontWeight={'bold'}>Name:</Text>
								<Text ml={1}>
									{addressItem.firstName} {addressItem.lastName}
								</Text>
							</Flex>
							<Flex>
								<Text fontWeight={'bold'}>Address:</Text>
								<Text ml={1}>
									{addressItem.address}, {addressItem.city}
								</Text>
							</Flex>
							<Flex>
								<Text fontWeight={'bold'}>State:</Text>
								<Text ml={1}>{addressItem.state}</Text>
							</Flex>
							<Flex>
								<Text fontWeight={'bold'}>Country:</Text>
								<Text ml={1}>{addressItem.country}</Text>
							</Flex>
							<Flex>
								<Text fontWeight={'bold'}>Email:</Text>
								<Text ml={1}>{addressItem.email}</Text>
							</Flex>
							<Flex>
								<Text fontWeight={'bold'}>Phone:</Text>
								<Text ml={1}>{addressItem.phone}</Text>
							</Flex>
						</Stack>
					</Box>
				))}
			</Box>
			<Box p={5} borderWidth={1} borderRadius={'md'} my={3}>
				<Box mb={5}>
					<Heading size={'lg'} color={mode('teal.600', 'teal.400')}>
						Order Summary
					</Heading>
					<Divider my={3} />
				</Box>
				{orderData.summary.map((summaryItem) => (
					<Box
						color={mode('gray.600', 'gray.400')}
						mt={3}
						key={orderData._id}
						fontSize={isScreenFixed ? 'md' : 'sm'}
					>
						<Flex my={1} justify="space-between">
							<Text>Total MRP</Text>
							<Text color={mode('teal.500', 'teal.400')} ml={1}>
								{summaryItem.totalMrp.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</Text>
						</Flex>
						<Flex my={1} justify="space-between">
							<Text>Tax Charge</Text>
							<Text color={mode('teal.500', 'teal.400')} ml={1}>
								+
								{summaryItem.taxCharge.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</Text>
						</Flex>
						<Flex my={1} justify="space-between">
							<Text>Shipping Charge</Text>
							<Text color={mode('teal.500', 'teal.400')} ml={1}>
								+
								{summaryItem.shippingCharge.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</Text>
						</Flex>
						<Divider />
						<Flex my={1} fontSize={'lg'} justify="space-between">
							<Text fontWeight={'bold'}> Total Amount</Text>
							<Text color={mode('teal.500', 'teal.400')} ml={1}>
								{summaryItem.totalAmount.toLocaleString('en-US', {
									style: 'currency',
									currency: 'INR',
								})}
							</Text>
						</Flex>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default OrderDetails;
