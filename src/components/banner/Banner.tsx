import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../../constants/BannerData';
import { Box, Image } from '@chakra-ui/react';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Banner = () => {
	return (
		<Box marginX={4} paddingY={4} userSelect="none">
			<Carousel
				swipeable={false}
				draggable={false}
				showDots={true}
				arrows={false}
				responsive={responsive}
				infinite={true}
				autoPlay={true}
				keyBoardControl={true}
				slidesToSlide={1}
				autoPlaySpeed={4000}
				containerClass="carousel-container"
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				{bannerData.map((data) => (
					<Image key={data.id} src={data.bannerImg} alt="banner" w="full" />
				))}
			</Carousel>
		</Box>
	);
};

export default Banner;
