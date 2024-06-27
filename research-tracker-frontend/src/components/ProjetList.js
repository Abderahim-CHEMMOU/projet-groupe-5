// src/components/ProjetList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ProjetList = () => {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    try {
      const response = await api.get('/projets/');
      setProjets(response.data);
    } catch (error) {
      console.error('There was an error fetching the projets!', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this projet?')) {
      try {
        await api.delete(`/projets/${id}/`);
        fetchProjets();
      } catch (error) {
        console.error('There was an error deleting the projet!', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Projets</h1>
      <ul>
        {projets.map((projet) => (
          <li key={projet.id}>
            {projet.titre} - {projet.description}
            <Link to={`/projets/${projet.id}/edit`}>Modifier</Link>
            <button onClick={() => handleDelete(projet.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <Link to="/projets/new">Créer un Projet</Link>
    </div>
  );
};

export default ProjetList;
