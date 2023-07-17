import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BeerPage from './pages/BeerPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/home',
      element: <Navigate to='/' />,
    },
    {
      path: '/beer/:beerId',
      element: <BeerPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
