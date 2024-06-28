// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ChercheurList from './components/ChercheurList';
import ChercheurForm from './components/ChercheurForm';
import ProjetList from './components/ProjetList';
import ProjetForm from './components/ProjetForm';
import PublicationList from './components/PublicationList';
import PublicationForm from './components/PublicationForm';

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <Link to="/" className="active">Home</Link>
          <Link to="/chercheurs">Chercheurs</Link>
          <Link to="/chercheurs/new">Ajouter un Chercheur</Link>
          <Link to="/projets">Projets</Link>
          <Link to="/projets/new">Ajouter un Projet</Link>
          <Link to="/publications">Publications</Link>
          <Link to="/publications/new">Ajouter une Publication</Link>
        </div>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chercheurs" element={<ChercheurList />} />
            <Route path="/chercheurs/new" element={<ChercheurForm />} />
            <Route path="/chercheurs/:id/edit" element={<ChercheurForm />} />
            <Route path="/projets" element={<ProjetList />} />
            <Route path="/projets/new" element={<ProjetForm />} />
            <Route path="/projets/:id/edit" element={<ProjetForm />} />
            <Route path="/publications" element={<PublicationList />} />
            <Route path="/publications/new" element={<PublicationForm />} />
            <Route path="/publications/:id/edit" element={<PublicationForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
