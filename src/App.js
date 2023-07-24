import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className="header">
        <div>
          <div className="container">
            <NoteState>
              <BrowserRouter>
                <Navbar />
                <div className="container">
                  <Toaster position="top-right" />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="About/*" element={<About />} />
                    <Route path="Contact/*" element={<Contact />} />
                    <Route path="Login/*" element={<Login />} />
                    <Route path="Signup/*" element={<Signup />} />
                  </Routes>
                </div>
                <Footer />
              </BrowserRouter>
            </NoteState>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
