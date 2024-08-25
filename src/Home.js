import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
      <div className="container">
        <h1 className="title">Pulse</h1>
        <h2>Ready to practice?</h2>
        <div className="button-container">
          <button className="launch-btn" onClick={() => navigate('/add')}>
              Addition
          </button>
          <button className="launch-btn" onClick={() => navigate('/multiply')}>
              Multiplication
          </button>
        </div>
        <div className="button-container">
          <button className="launch-btn" onClick={() => navigate('/integers')}>
            Integers
          </button>
        </div>
        <h2>Want to learn more about Pulse?</h2>
        <button className="launch-btn" onClick={() => navigate('/about')}>
            About
        </button>
      </div>
      
    );
  }
  
  export default Home;