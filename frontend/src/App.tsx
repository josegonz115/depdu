
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import LandingPage from './routes/LandingPage';
//import Chat from './routes/ChatbotPage';
import Maps from './components/Maps';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage />
      ),
    },
    // {
    //   path: "/chat",
    //   element: (
    //     <Chat />
    //   ),
    // },
    {
      path: "/maps",
      element: (
        <Maps/>
      ),
    },
  ]);
  return (
    <main className='App'>
        <></>
        <RouterProvider router={router} />
    </main>
  )
}

export default App;
