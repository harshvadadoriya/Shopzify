import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { useState } from 'react';

const Payment = () => {
	const isScreenFixed = useBreakpointValue({ base: false, md: true });
	const submitMenuBgColor = useColorModeValue('teal.400', 'teal.600');

	const [paymentInfo, setPaymentInfo] = useState({
		cardName: '',
		cardNumber: '',
		expirationDate: '',
		cvv: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setPaymentInfo((prevPaymentInfo) => ({
			...prevPaymentInfo,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', paymentInfo);
	};

	return (
		<Box marginX={4} marginTop={isScreenFixed ? '8.3rem' : '0'}>
			<Center>
				<Text
					fontWeight="bold"
					fontSize="3xl"
					my={2}
					mt={'2.5rem'}
					color="teal"
				>
					Payment Details
				</Text>
			</Center>
			<Flex justify="center" py={10}>
				<Box maxW="container.xl" w="full">
					<Stack direction={['column', 'column', 'row']} spacing={8}>
						<Box flex={1}>
							<Heading mb={6}>Payment Information</Heading>
							<form onSubmit={handleSubmit}>
								<VStack spacing={4}>
									<FormControl isRequired>
										<FormLabel>Cardholder Name</FormLabel>
										<Input
											type="text"
											name="cardName"
											value={paymentInfo.cardName}
											onChange={handleChange}
										/>
									</FormControl>

									<HStack spacing={4} w="full">
										<FormControl isRequired>
											<FormLabel>Card Number</FormLabel>
											<Input
												type="text"
												name="cardNumber"
												value={paymentInfo.cardNumber}
												onChange={handleChange}
											/>
										</FormControl>
										<FormControl isRequired>
											<FormLabel>Expiration Date</FormLabel>
											<Input
												type="text"
												name="expirationDate"
												value={paymentInfo.expirationDate}
												onChange={handleChange}
											/>
										</FormControl>
									</HStack>

									<FormControl isRequired>
										<FormLabel>CVV</FormLabel>
										<Input
											type="text"
											name="cvv"
											value={paymentInfo.cvv}
											onChange={handleChange}
										/>
									</FormControl>
								</VStack>
								<Button
									type="submit"
									colorScheme="teal"
									mt={4}
									color="white"
									bgColor={submitMenuBgColor}
									_hover={{
										bgColor: 'teal.500',
									}}
								>
									Submit & Next
								</Button>
							</form>
						</Box>

						<Box flex={1}>
							<Heading mb={6}>Order Summary</Heading>
							<Box borderWidth={1} borderRadius="md" p={4}>
								<Text mb={4}>Product Name</Text>
								<Text mb={4}>Price</Text>
								<Text mb={4}>Quantity</Text>
								<Text mb={4}>Subtotal</Text>
							</Box>
						</Box>
					</Stack>
				</Box>
			</Flex>
		</Box>
	);
};

export default Payment;
