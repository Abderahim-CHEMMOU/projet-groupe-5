// src/components/ChercheurList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ChercheurList = () => {
  const [chercheurs, setChercheurs] = useState([]);

  useEffect(() => {
    fetchChercheurs();
  }, []);

  const fetchChercheurs = async () => {
    try {
      const response = await api.get('/chercheurs/');
      setChercheurs(response.data);
    } catch (error) {
      console.error('There was an error fetching the chercheurs!', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this chercheur?')) {
      try {
        await api.delete(`/chercheurs/${id}/`);
        fetchChercheurs();
      } catch (error) {
        console.error('There was an error deleting the chercheur!', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Chercheurs</h1>
      <ul>
        {chercheurs.map((chercheur) => (
          <li key={chercheur.id}>
            {chercheur.nom} - {chercheur.specialite}
            <Link to={`/chercheurs/${chercheur.id}/edit`}>Modifier</Link>
            <button onClick={() => handleDelete(chercheur.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <Link to="/chercheurs/new">Créer un Chercheur</Link>
    </div>
  );
};

export default ChercheurList;
