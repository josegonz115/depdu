
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import LandingPage from './routes/LandingPage';
import QuestionareParser from './routes/QuestionareParser';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage />
      ),
    },
    {
      path: '/questionare',
      element: (
        <QuestionareParser/>
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
