import './App.css';
import ColorMode from './colorMode/ColorMode';
import Banners from './components/gridBanner/Banners';
import Navbar from './components/navbar/Navbar';
import SecondaryNavbar from './components/secondaryNavbar/SecondaryNavbar';

function App() {
	return (
		<>
			<Navbar />
			<SecondaryNavbar />
			<Banners />
			<ColorMode />
		</>
	);
}

export default App;
