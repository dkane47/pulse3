import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
      <div className="container">
        <h1>Ready to practice?</h1>
        <div>
        <button className="launch-btn" onClick={() => navigate('/add')}>
            Addition
        </button>
        <button className="launch-btn" onClick={() => navigate('/multiply')}>
            Multiplication
        </button>
        </div>
        <h1>Want to learn more about Pulse?</h1>
        <button className="launch-btn" onClick={() => navigate('/about')}>
            About
        </button>
      </div>
      
    );
  }
  
  export default Home;