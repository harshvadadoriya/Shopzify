import React from 'react';
import Banner from '../banner/Banner';
import Footer from '../footer/Footer';
import FlashSale from './products/FlashSale';
import TopPicks from './products/TopPicks';
import TrendingNow from './products/TrendingNow';

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
