
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import LandingPage from './routes/LandingPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage />
      ),
    },
    // {
    //   path: "/about",
    //   element: <div>About</div>,
    // },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App;
