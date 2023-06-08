import { ChakraProvider } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import SuspenseLoading from './components/pages/SuspenseLoading';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<Suspense fallback={<SuspenseLoading />}>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</Suspense>
		</ChakraProvider>
	</React.StrictMode>
);
