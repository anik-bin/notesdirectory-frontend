import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <div className="header">
        <div>
          <div className="container">
            <NoteState>
              <BrowserRouter>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                  <Routes>
                    <Route path="/" element={<Home showAlert={showAlert} />} />
                    <Route path="About/*" element={<About />} />
                    <Route path="Contact/*" element={<Contact />} />
                    <Route path="Login/*" element={<Login showAlert={showAlert} />} />
                    <Route path="Signup/*" element={<Signup showAlert={showAlert} />} />
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
