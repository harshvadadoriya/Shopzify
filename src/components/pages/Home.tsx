import React from 'react';
import Banner from '../banner/Banner';
import Footer from '../footer/Footer';
import FlashSale from '../products/productsHomeSection/FlashSale';
import TopPicks from '../products/productsHomeSection/TopPicks';
import TrendingNow from '../products/productsHomeSection/TrendingNow';

const Home = () => {
	return (
		<>
			<Banner />
			<TopPicks />
			<FlashSale />
			<TrendingNow />
			<Footer />
		</>
	);
};

export default Home;
