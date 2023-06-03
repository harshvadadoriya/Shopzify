import { useEffect, useState } from 'react';
import {
	Badge,
	Box,
	Center,
	Flex,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from '@chakra-ui/react';
import { useGetProductDataQuery } from '../../../redux/apiSlice';
import { ProductFormValues } from '../../../interfaces/interface';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistItem = () => {
	const cardBorderColor = useColorModeValue('gray.200', 'gray.600');
	const cardBgColor = useColorModeValue('white', 'gray.700');
	const priceTextColor = useColorModeValue('gray.600', 'gray.400');
	const dummyPriceTextColor = useColorModeValue('gray.400', 'gray.500');
	const isScreenFixed = useBreakpointValue({ base: false, md: true });

	const [wishlistItems, setWishlistItems] = useState<string[]>([]);
	const { data: productData, isLoading, isError } = useGetProductDataQuery();

	const navigate = useNavigate();

	const handleProductClick = (product: ProductFormValues) => {
		navigate(`/products/${product._id}`, { state: { product } });
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const storedWishlistItems = localStorage.getItem('wishlistItems');
		const initialWishlistItems = storedWishlistItems
			? JSON.parse(storedWishlistItems)
			: [];
		setWishlistItems(initialWishlistItems);
		if (storedWishlistItems) {
			setWishlistItems(JSON.parse(storedWishlistItems));
		}
	}, []);

	const [likedProductId, setLikedProductId] = useState('');
	const handleToggleWishlist = (productId: string) => {
		const updatedWishlistItems = wishlistItems.includes(productId)
			? wishlistItems.filter((id) => id !== productId)
			: [...wishlistItems, productId];
		setWishlistItems(updatedWishlistItems);
		localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));

		setLikedProductId((prevLikedProductId) =>
			prevLikedProductId === productId ? '' : productId
		);
	};

	if (isLoading) {
		return <Box marginX={4}>Loading...</Box>;
	}

	if (isError) {
		return <Box marginX={4}>Error fetching wishlist items</Box>;
	}

	const wishlistProducts = productData?.productDetails.filter(
		(product: ProductFormValues) => wishlistItems.includes(product._id)
	);

	return (
		<>
			<Box marginX={4} marginTop={isScreenFixed ? '8.3rem' : '0'}>
				<Center>
					<Text fontWeight="bold" fontSize="lg" my={2}>
						Wishlist Items
					</Text>
				</Center>
				<Flex justifyContent="center" flexWrap="wrap" alignItems="left">
					{wishlistProducts?.map((product: ProductFormValues) => (
						<Box
							key={product._id}
							className="relative max-w-md rounded-3xl p-2 mt-[2rem]"
							border={1}
							borderStyle="solid"
							bgColor={cardBgColor}
							borderColor={cardBorderColor}
							mx={2}
						>
							<div
								className="overflow-x-hidden rounded-2xl relative cursor-pointer"
								style={{ userSelect: 'none' }}
								onClick={() => handleProductClick(product)}
							>
								<img
									className="h-[15rem] w-[20rem] rounded-2xl object-cover"
									src={product.image}
								/>
								<Box className="absolute left-2 top-1 rounded-full">
									<Badge
										rounded="full"
										px="2"
										fontSize="0.8em"
										colorScheme="red"
										color="red.500"
										bgColor="red.100"
									>
										New
									</Badge>
								</Box>
							</div>
							<div className="mt-4 pl-2 mb-2 flex justify-between">
								<div>
									<p
										className="text-lg font-semibold text-teal-500 mb-0 text-left"
										style={{ userSelect: 'none' }}
									>
										{product.name}
									</p>
									<div
										className="flex items-center"
										style={{ userSelect: 'none' }}
									>
										<Text className="text-lg mt-0" color={priceTextColor}>
											Rs. {Number(product.discountedPrice).toLocaleString()}
										</Text>
										<Text
											className="text-md mt-0 ml-2 line-through"
											color={dummyPriceTextColor}
										>
											Rs. {Number(product.originalPrice).toLocaleString()}
										</Text>
									</div>
								</div>
								<Flex
									onClick={() => {
										handleToggleWishlist(product._id);
									}}
									className={`heart-button flex flex-col-reverse mb-1 mr-4 group cursor-pointer ${
										wishlistItems.includes(product._id) ? 'is-active' : ''
									}`}
								>
									{wishlistItems.includes(product._id) ? (
										<FaHeart fill="red" fontSize={'20px'} />
									) : (
										<FaRegHeart fontSize={'20px'} fill="gray" />
									)}
								</Flex>
							</div>
						</Box>
					))}
				</Flex>
			</Box>
		</>
	);
};

export default WishlistItem;