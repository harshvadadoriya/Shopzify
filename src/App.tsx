import './App.css';
import Banner from './components/banner/Banner';
import Navbar from './components/navbar/Navbar';
import TopPicks from './components/products/TopPicks';

function App() {
	return (
		<>
			<Navbar />
			<Banner />
			<TopPicks />
		</>
	);
}

export default App;
