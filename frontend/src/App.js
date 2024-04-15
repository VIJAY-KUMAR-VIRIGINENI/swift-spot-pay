import React from 'react';

import MyMap from './components/MyMap';
import Login from './components/Login';
import Register from './components/Register'; 
import Payment from './components/Payment';
import Body from './components/Body';
import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Routes,Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
    <div >
    <Routes>
    <Route path="/" element={<Header/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/home" element={<Home/>} />  
    <Route path="/payment" element={<Payment/>} />  
      </Routes>
    </div>


    </Router>

    </>
  );
}

export default App;
