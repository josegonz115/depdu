
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from './routes/LandingPage';
import Chat from './routes/ChatbotPage';
import NavBar from './components/NavBar';
//import Chat from './routes/ChatbotPage';
import Maps from './components/Maps';

function App() {

  return (
    <main className='App'>
      <BrowserRouter basename="/">
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />}/> {/* 👈 Renders at /app/ */}
          <Route path="/chat" element={<Chat />}/> {/* 👈 Renders at /app/ */}
          <Route path="/maps" element={<Maps />}/> {/* 👈 Renders at /app/ */}
          <Route path="*" element={<h1 className='m-auto'>Ooopsie no page here 🥹</h1> }/> {/* 👈 Renders at /app/ */}
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App;
