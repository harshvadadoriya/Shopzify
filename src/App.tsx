import './App.css';
import Banner from './components/banner/Banner';
import Navbar from './components/navbar/Navbar';
import TopPicks from './components/products/TopPicks';
import SecondaryNavbar from './components/secondaryNavbar/SecondaryNavbar';

function App() {
	return (
		<>
			<Navbar />
			<SecondaryNavbar />
			<Banner />
			<TopPicks />
		</>
	);
}

export default App;
