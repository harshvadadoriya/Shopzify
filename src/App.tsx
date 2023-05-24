import './App.css';
import ColorMode from './colorMode/ColorMode';
import Navbar from './components/navbar/Navbar';
import SecondaryNavbar from './components/secondaryNavbar/SecondaryNavbar';

function App() {
	return (
		<>
			<Navbar />
			<SecondaryNavbar />
			<ColorMode />
		</>
	);
}

export default App;
