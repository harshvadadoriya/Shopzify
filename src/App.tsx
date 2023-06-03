import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const LazyRoot = lazy(() => import('./components/pages/RootComponent'));
const LazySuspense = lazy(() => import('./components/pages/SuspenseLoading'));
const LazyHome = lazy(() => import('./components/pages/Home'));
const LazyProductDetails = lazy(
	() => import('./components/pages/products/ProductDetails')
);
const LazyWishlist = lazy(
	() => import('./components/pages/products/WishlistItem')
);

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LazySuspense />}>
				<LazyRoot />
			</Suspense>
		),
		children: [
			{
				path: '/',
				element: <LazyHome />,
			},
			{
				path: '/products/:id',
				element: (
					<Suspense fallback={<LazySuspense />}>
						<LazyProductDetails />
					</Suspense>
				),
			},
			{
				path: '/wishlist',
				element: (
					<Suspense fallback={<LazySuspense />}>
						<LazyWishlist />
					</Suspense>
				),
			},
		],
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
