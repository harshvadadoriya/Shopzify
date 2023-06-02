import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { getProductsApi } from './redux/apiSlice';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<Provider store={store}>
				<ApiProvider api={getProductsApi}>
					<App />
				</ApiProvider>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
