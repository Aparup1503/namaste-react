import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Header from './components/Header';
import Body from './components/Body';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Shimmer from './components/Shimmer';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';

// ============================================================
// 🚀 PERFORMANCE: LAZY LOADING & CODE SPLITTING
// ============================================================
// `lazy()` loads a component through a dynamic import.
// With bundler support, these features can be emitted as separate
// JavaScript chunks and loaded when React first renders them.
//
// Benefits:
// - Reduces JavaScript required for the initial page.
// - Defers less frequently used features until needed.
// - Can improve initial loading performance on larger applications.
//
// IMPORTANT:
// The lazily imported modules must have a default export.
// ============================================================

const About = lazy(() => import('./components/About'));
const Grocery = lazy(() => import('./components/Grocery'));

// ============================================================
// 🟩 REUSABLE LOADING BOUNDARY
// ============================================================
// Suspense displays this fallback while a lazy component's module
// is loading. Reusing the same fallback avoids duplicating JSX.
//
// Suspense handles the loading state, not failed imports.
// Use an Error Boundary or route error handling for failures.
// ============================================================

const LazyLoadingFallback = () => <Shimmer />;

// ============================================================
// 🟦 SHARED APPLICATION LAYOUT
// ============================================================
// This layout remains visible while child routes change.
// <Outlet /> renders the component matched by the current route.
//
// Keeping Header in the parent layout avoids repeating it in every
// route definition.
// ============================================================

const AppLayout = () => {
  //- Holds the authenticated user's display name and makes it available
  //- to descendant components through the application context.
  const [userName, setUserName] = useState();

  useEffect(() => {
    //- Initialize the authenticated user when the application layout mounts.
    //- In a production application, this would typically be replaced with
    //- an authentication API call or user session retrieval.
    const data = {
      name: 'Aparup Giri',
    };

    setUserName(data.name);
  }, []);

  return (
    //- Makes the Redux store available to the entire React component tree.
    <Provider store={appStore}>
      {/*Provide authenticated user information and update capabilities  to
      all components within the application layout. */}
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app min-h-screen bg-white text-gray-900">
          <Header />
          {/* Render the component associated with the currently matched route. */}
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

// ============================================================
// 🟦 ROUTER CONFIGURATION
// ============================================================
// `createBrowserRouter()` creates the application's router.
// The root route supplies the shared layout, while its children
// define the individual pages.
//
// `index: true` represents the default child route for "/".
//
// `errorElement` provides a route-level error UI for errors handled
// by React Router, including applicable loader/action/render errors.
// It is not a replacement for every kind of React Error Boundary.
// ============================================================

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      // 🏠 Home page: loaded with the initial application code.
      {
        index: true,
        element: <Body />,
      },

      // ℹ️ About page: its module can load on demand.
      {
        path: 'about',
        element: (
          <Suspense fallback={<LazyLoadingFallback />}>
            <About />
          </Suspense>
        ),
      },

      // 📞 Contact page: statically imported.
      {
        path: 'contact',
        element: <Contact />,
      },

      // 🛒 Grocery page: loaded on demand.
      {
        path: 'grocery',
        element: (
          <Suspense fallback={<LazyLoadingFallback />}>
            <Grocery />
          </Suspense>
        ),
      },

      // 🍽️ Restaurant menu: resId is a dynamic URL parameter.
      // Example: /restaurants/12345
      {
        path: 'restaurants/:resId',
        element: <RestaurantMenu />,
      },
      // 🛒 Cart page: statically imported.
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

// ============================================================
// 🟦 APPLICATION ENTRY POINT
// ============================================================
// Create the React root once and render the router provider.
// RouterProvider connects the route configuration to the UI.
// ============================================================

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

createRoot(rootElement).render(<RouterProvider router={appRouter} />);
