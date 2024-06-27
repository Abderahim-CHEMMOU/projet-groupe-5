// src/components/PublicationList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await api.get('/publications/');
      setPublications(response.data);
    } catch (error) {
      console.error('There was an error fetching the publications!', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await api.delete(`/publications/${id}/`);
        fetchPublications();
      } catch (error) {
        console.error('There was an error deleting the publication!', error);
      }
    }
  };

  return (
    <div>
      <h1>Liste des Publications</h1>
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>
            {publication.titre} - {publication.resume}
            <Link to={`/publications/${publication.id}/edit`}>Modifier</Link>
            <button onClick={() => handleDelete(publication.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <Link to="/publications/new">Créer une Publication</Link>
    </div>
  );
};

export default PublicationList;
