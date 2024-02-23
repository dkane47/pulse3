import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Add from './Add';
import Subtract from './Subtract';
import Multiply from './Multiply';
import Divide from './Divide';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/subtract" element={<Subtract />} />
        <Route path="/multiply" element={<Multiply />} />
        <Route path="/divide" element={<Divide />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
