import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

const LazyRoot = lazy(() => import('./components/pages/RootComponent'));
const LazySuspense = lazy(() => import('./components/pages/SuspenseLoading'));
const LazyHome = lazy(() => import('./components/pages/Home'));
const LazyProductDetails = lazy(
	() => import('./components/products/pages/ProductDetails')
);
const LazyWishlist = lazy(
	() => import('./components/products/pages/WishlistItem')
);
const LazyCartCheckout = lazy(
	() => import('./components/products/pages/CartCheckout')
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
			{
				path: '/cart',
				element: (
					<Suspense fallback={<LazySuspense />}>
						<LazyCartCheckout />
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
