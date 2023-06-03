import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useBreakpointValue,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	VisuallyHidden,
	List,
	ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { ProductFormValues } from '../../../interfaces/interface';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
	const { state } = useLocation();
	const productData: ProductFormValues = state?.product;

	const isScreenFixed = useBreakpointValue({ base: false, md: true });

	if (!productData) {
		return (
			<>
				<Text>No data</Text>
			</>
		);
	}

	return (
		<>
			<Box marginTop={isScreenFixed ? '8.3rem' : '0'}>
				<Container maxW={'7xl'}>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 18, md: 24 }}
					>
						<Flex>
							<Image
								rounded={'md'}
								alt={'product image'}
								src={productData.image}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								h={{ base: '80%', sm: '400px', lg: '500px' }}
							/>
						</Flex>
						<Stack spacing={{ base: 6, md: 10 }}>
							<Box as={'header'}>
								<Heading
									lineHeight={1.1}
									fontWeight={600}
									color={useColorModeValue('teal.400', 'teal.400')}
									fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
								>
									{productData.name}
								</Heading>
								<Flex>
									<Text
										color={useColorModeValue('gray.600', 'gray.400')}
										fontWeight={300}
										fontSize={'2xl'}
									>
										Rs. {productData.discountedPrice}
									</Text>
									<Text
										className="line-through ml-2 mt-1"
										color="gray.500"
										fontWeight={300}
										fontSize={'xl'}
									>
										Rs. {productData.originalPrice}
									</Text>
								</Flex>
							</Box>

							<Stack
								spacing={{ base: 4, sm: 6 }}
								direction={'column'}
								divider={
									<StackDivider
										borderColor={useColorModeValue('gray.200', 'gray.600')}
									/>
								}
							>
								<VStack spacing={{ base: 4, sm: 6 }}>
									<Text
										color={useColorModeValue('gray.600', 'gray.400')}
										fontSize={'2xl'}
										fontWeight={'300'}
									>
										{productData.description}
									</Text>
									<Text
										fontSize={'lg'}
										color={useColorModeValue('gray.600', 'gray.400')}
									>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
										aliquid amet at delectus doloribus dolorum expedita hic,
										ipsum maxime modi nam officiis porro, quae, quisquam quos
										reprehenderit velit? Natus, totam.
									</Text>
								</VStack>
								<Box>
									<Text
										fontSize={{ base: '16px', lg: '18px' }}
										color={useColorModeValue('teal.400', 'teal.500')}
										fontWeight={'600'}
										textTransform={'uppercase'}
										mb={'4'}
									>
										Features
									</Text>

									<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
										<List
											spacing={2}
											color={useColorModeValue('gray.600', 'gray.400')}
										>
											<ListItem>Chronograph</ListItem>
											<ListItem>Master Chronometer Certified</ListItem>
											<ListItem>Tachymeter</ListItem>
										</List>
										<List spacing={2} color="gray.500">
											<ListItem>Anti-magnetic</ListItem>
											<ListItem>Chronometer</ListItem>
											<ListItem>Small seconds</ListItem>
										</List>
									</SimpleGrid>
								</Box>
								<Box>
									<Text
										fontSize={{ base: '16px', lg: '18px' }}
										color={useColorModeValue('teal.400', 'teal.500')}
										fontWeight={'600'}
										textTransform={'uppercase'}
										mb={'4'}
									>
										Product Details
									</Text>

									<List spacing={2}>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													delectus:
												</Text>
												<Text ml={2} color="gray.500">
													expedita
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													quisquam quos:
												</Text>
												<Text ml={2} color="gray.500">
													reprehenderit
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													Case:
												</Text>
												<Text ml={2} color="gray.500">
													nam
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													aliquid amet:
												</Text>
												<Text ml={2} color="gray.500">
													at delectus
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													doloribus dolorum:
												</Text>
												<Text ml={2} color="gray.500">
													expedita hic
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													Crystal:
												</Text>
												<Text ml={2} color="gray.500">
													Domed sapphire
												</Text>
											</Flex>
										</ListItem>
										<ListItem>
											<Flex>
												<Text
													as={'span'}
													fontWeight={600}
													color={useColorModeValue('gray.600', 'gray.400')}
												>
													adipisicing:
												</Text>
												<Text ml={2} color="gray.500">
													modi nam
												</Text>
											</Flex>
										</ListItem>
									</List>
								</Box>
							</Stack>

							<Button
								rounded={'md'}
								w={'full'}
								mt={8}
								size={'lg'}
								py={'7'}
								colorScheme="teal"
								bg={useColorModeValue('teal.700', 'teal.400')}
								color={useColorModeValue('white', 'white')}
								textTransform={'uppercase'}
								_hover={{
									transform: 'translateY(2px)',
									boxShadow: 'lg',
								}}
							>
								Add to cart
							</Button>

							<Stack
								direction="row"
								alignItems="center"
								justifyContent={'center'}
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								<MdLocalShipping />
								<Text>2-3 business days delivery</Text>
							</Stack>
						</Stack>
					</SimpleGrid>
				</Container>
			</Box>
		</>
	);
};

export default ProductDetails;