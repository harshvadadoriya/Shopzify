import './App.css';
import Navbar from './components/navbar/Navbar';
import TopPicks from './components/products/TopPicks';
import SecondaryNavbar from './components/secondaryNavbar/SecondaryNavbar';

function App() {
	return (
		<>
			<Navbar />
			<SecondaryNavbar />
			<TopPicks />
		</>
	);
}

export default App;
