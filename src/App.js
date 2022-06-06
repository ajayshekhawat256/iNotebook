import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState} from 'react';

function App() {
  const[alert,setalert]=useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null);
    },1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About showAlert={showAlert}/>
              </Route>
              <Route exact path='/login' >
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path='/Signup' >
                <Signup showAlert={showAlert}/>
              </Route>
            </Routes>
          </div>

        </Router>
      </NoteState>

    </>
  );
}

export default App;