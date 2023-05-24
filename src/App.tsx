import './App.css';
import ColorMode from './colorMode/ColorMode';
import Banner from './components/banner/Banner';
import Navbar from './components/navbar/Navbar';
import TopPicks from './components/products/TopPicks';
import SecondaryNavbar from './components/secondaryNavbar/SecondaryNavbar';

function App() {
	return (
		<>
			<Navbar />
			<SecondaryNavbar />
			<TopPicks />
			<ColorMode />
		</>
	);
}

export default App;
