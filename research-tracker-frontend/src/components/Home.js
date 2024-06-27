// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Research Tracker</h1>
      <ul>
        <li><Link to="/chercheurs">Chercheurs</Link></li>
        <li><Link to="/projets">Projets</Link></li>
        <li><Link to="/publications">Publications</Link></li>
      </ul>
    </div>
  );
};

export default Home;
