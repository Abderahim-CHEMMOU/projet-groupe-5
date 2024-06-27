// src/components/ChercheurForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ChercheurForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [specialite, setSpecialite] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/chercheurs/${id}/`)
        .then(response => {
          setNom(response.data.nom);
          setSpecialite(response.data.specialite);
        })
        .catch(error => console.error('There was an error fetching the chercheur!', error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { nom, specialite };
    const url = id ? `/chercheurs/${id}/` : '/chercheurs/';
    const method = id ? 'put' : 'post';

    try {
      await api[method](url, data);
      alert('Chercheur sauvegardé avec succès!');
      navigate('/chercheurs');
    } catch (error) {
      console.error('There was an error saving the chercheur!', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Modifier' : 'Créer'} un Chercheur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={nom} onChange={e => setNom(e.target.value)} required />
        </div>
        <div>
          <label>Spécialité:</label>
          <input type="text" value={specialite} onChange={e => setSpecialite(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Modifier' : 'Créer'}</button>
      </form>
    </div>
  );
};

export default ChercheurForm;
