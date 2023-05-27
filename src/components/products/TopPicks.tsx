import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { TopPicksProductsData } from '../../constants/TopPicksProductsData';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { sliderSettings } from '../../utils/sliderSettings';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import 'swiper/css';

const SliderButtons = () => {
	const swiper = useSwiper();
	return (
		<Flex position="absolute" top="2" right="0" zIndex={1}>
			<Button onClick={() => swiper.slidePrev()}>
				<FiChevronLeft />
			</Button>
			<Button onClick={() => swiper.slideNext()} ml="2">
				<FiChevronRight />
			</Button>
		</Flex>
	);
};

const TopPicks = () => {
	const cardBorderColor = useColorModeValue('gray.200', 'gray.600');
	const cardBgColor = useColorModeValue('white', 'gray.700');
	const priceTextColor = useColorModeValue('gray.600', 'gray.400');
	const dummyPriceTextColor = useColorModeValue('gray.400', 'gray.500');
	return (
		<>
			<Box marginX={4} position="relative">
				<Box
					fontSize={25}
					fontWeight={600}
					color="teal.400"
					justifyContent="space-between"
					position="absolute"
					top={2}
					left={1}
					right={0}
					zIndex={2}
					pointerEvents="none"
					userSelect="none"
				>
					<Text>Top Picks</Text>
				</Box>
				<center>
					<Swiper {...sliderSettings}>
						<SliderButtons />
						{TopPicksProductsData.map((obj, i) => (
							<SwiperSlide key={i}>
								<Box
									key={obj.id}
									className="relative max-w-sm shadow-md rounded-3xl p-2 my-[4rem] cursor-pointer"
									border={1}
									borderStyle="solid"
									bgColor={cardBgColor}
									borderColor={cardBorderColor}
								>
									<div
										className="overflow-x-hidden rounded-2xl relative"
										style={{ userSelect: 'none' }}
									>
										<img
											className="h-[15rem] rounded-2xl w-full object-cover"
											src={obj.productImage}
										/>
										<p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 group-hover:opacity-50 opacity-70"
												fill="none"
												viewBox="0 0 24 24"
												stroke="black"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="1.5"
													d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
												/>
											</svg>
										</p>
									</div>
									<div className="mt-4 pl-2 mb-2 flex justify-between">
										<div>
											<p
												className="text-lg font-semibold text-teal-500 mb-0 text-left"
												style={{ userSelect: 'none' }}
											>
												{obj.productName}
											</p>
											<div
												className="flex items-center"
												style={{ userSelect: 'none' }}
											>
												<Text className="text-lg mt-0" color={priceTextColor}>
													Rs. {Number(obj.productPrice).toLocaleString()}
												</Text>
												<Text
													className="text-md mt-0 ml-2 line-through"
													color={dummyPriceTextColor}
												>
													Rs. {Number(obj.productDummyPrice).toLocaleString()}
												</Text>
											</div>
										</div>
										<div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 group-hover:opacity-70"
												fill="none"
												viewBox="0 0 24 24"
												stroke="gray"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												/>
											</svg>
										</div>
									</div>
								</Box>
							</SwiperSlide>
						))}
					</Swiper>
				</center>
			</Box>
		</>
	);
};

export default TopPicks;
