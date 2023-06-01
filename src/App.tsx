import './App.css';
import Banner from './components/banner/Banner';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import FlashSale from './components/products/FlashSale';
import TopPicks from './components/products/TopPicks';
import TrendingNow from './components/products/TrendingNow';

function App() {
	return (
		<>
			<Navbar />
			<Banner />
			<TopPicks />
			<FlashSale />
			<TrendingNow />
			<Footer />
		</>
	);
}

export default App;
