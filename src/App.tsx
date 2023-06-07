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

// const ProtectedRoute = ({
//   component: Component,
// }: {
//   component: JSX.Element;
// }) => {
//   const isLoggedIn = useAppSelector(selectIsLoggedIn);

//   return isLoggedIn ? <Navigate to="/" /> : Component;
// };

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LazySuspense />}>
        <LazyRoot />
      </Suspense>
    ),
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
        path: "/login",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazyLogin />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LazySuspense />}>
            <LazySignup />
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
      // {
      //   path: "/login",
      //   element: <ProtectedRoute component={<LazyLogin />} />,
      // },
      // {
      //   path: "/signup",
      //   element: <ProtectedRoute component={<LazySignup />} />,
      // },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
