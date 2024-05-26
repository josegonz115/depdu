
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import LandingPage from './routes/LandingPage';
import Chat from './routes/ChatbotPage';
import NavBar from './components/NavBar';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage />
      ),
    },
    {
      path: "/chat",
      element: (
        <Chat />
      ),
    },
  ]);
  return (
    <main className='App'>
        <NavBar />
        <RouterProvider router={router} />
    </main>
  )
}

export default App;
