import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { selectIsLoggedIn } from "./redux/authSliceRedux/authSlice";
import { useAppSelector } from "./redux/store";

const LazyRoot = lazy(() => import("./components/pages/RootComponent"));
const LazySuspense = lazy(() => import("./components/pages/SuspenseLoading"));
const LazyHome = lazy(() => import("./components/pages/Home"));
const LazyProductDetails = lazy(
  () => import("./components/products/pages/ProductDetails")
);
const LazyWishlist = lazy(
  () => import("./components/products/pages/WishlistItem")
);
const LazyCartCheckout = lazy(
  () => import("./components/products/pages/CartCheckout")
);
const LazyLogin = lazy(() => import("./components/pages/authentication/Login"));
const LazySignup = lazy(
  () => import("./components/pages/authentication/Signup")
);
const LazySearchedProducts = lazy(
  () => import("./components/secondaryNavbar/SearchedProducts")
);
const LazyAddress = lazy(
  () => import("./components/products/pages/checkoutPages/Address")
);
const LazyPayment = lazy(
  () => import("./components/products/pages/checkoutPages/Payment")
);
const LazyPurchaseSuccess = lazy(
  () => import("./components/products/pages/checkoutPages/PurchaseSuccess")
);
const LazyOrderPage = lazy(
  () => import("./components/products/pages/orderPage/OrderPage")
);
const LazyOrderDetails = lazy(
  () => import("./components/products/pages/orderPage/OrderDetails")
);

const ProtectedRoute = ({
  component: Component,
}: {
  component: JSX.Element;
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : Component;
};

const ProtectedRouteTwo = ({
  component: Component,
}: {
  component: JSX.Element;
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to="/login" />;
};

const mainRoutes = [
  {
    path: "/",
    element: <LazyRoot />,
    children: [
      {
        path: "/",
        element: <LazyHome />,
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyWishlist />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyCartCheckout />
          </Suspense>
        ),
      },
      {
        path: "/search-products",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazySearchedProducts />
          </Suspense>
        ),
      },
      {
        path: "/address",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyAddress />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyPayment />
          </Suspense>
        ),
      },
      {
        path: "/success",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyPurchaseSuccess />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyOrderPage />
          </Suspense>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyOrderDetails />
          </Suspense>
        ),
      },
    ],
  },
];

const authRoutes = [
  {
    path: "/login",
    element: <ProtectedRoute component={<LazyLogin />} />,
  },
  {
    path: "/signup",
    element: <ProtectedRoute component={<LazySignup />} />,
  },
];

const router = createBrowserRouter([...mainRoutes, ...authRoutes]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
