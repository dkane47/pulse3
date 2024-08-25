import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Add from './Add';
import Subtract from './Subtract';
import Multiply from './Multiply';
import Divide from './Divide';
import Intro from './Intro';
import Integers from './Integers';
import About from './About';
import AboutIntegers from './AboutIntegers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/subtract" element={<Subtract />} />
        <Route path="/multiply" element={<Multiply />} />
        <Route path="/divide" element={<Divide />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/integers" element={<Integers />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-int" element={<AboutIntegers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
