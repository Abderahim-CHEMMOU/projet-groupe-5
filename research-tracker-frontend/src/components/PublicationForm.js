import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/PublicationForm.css';

const PublicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [resume, setResume] = useState('');
  const [projet, setProjet] = useState('');
  const [datePublication, setDatePublication] = useState('');
  const [projetOptions, setProjetOptions] = useState([]);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await api.get('/projets/');
        if (response.data && Array.isArray(response.data.results)) {
          setProjetOptions(response.data.results);
        } else {
          setProjetOptions([]);
        }
      } catch (error) {
        console.error('There was an error fetching the projets!', error);
        setProjetOptions([]);
      }
    };

    fetchProjets();

    if (id) {
      api.get(`/publications/${id}/`)
        .then(response => {
          setTitre(response.data.titre);
          setResume(response.data.resume);
          setProjet(response.data.projet.id);  // Assurez-vous que cela pointe vers l'ID du projet
          setDatePublication(response.data.date_publication);
        })
        .catch(error => console.error('There was an error fetching the publication!', error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      titre,
      resume,
      projet,
      date_publication: datePublication
    };
    const url = id ? `/publications/${id}/` : '/publications/';
    const method = id ? 'put' : 'post';

    try {
      await api[method](url, data);
      alert('Publication sauvegardée avec succès!');
      navigate('/publications');
    } catch (error) {
      console.error('There was an error saving the publication!', error);
    }
  };

  return (
    <div className="publication-form-container">
      <h1>{id ? 'Modifier' : 'Créer'} une Publication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input type="text" value={titre} onChange={e => setTitre(e.target.value)} required />
        </div>
        <div>
          <label>Résumé:</label>
          <textarea value={resume} onChange={e => setResume(e.target.value)} required />
        </div>
        <div>
          <label>Projet:</label>
          <select value={projet} onChange={e => setProjet(e.target.value)} required>
            <option value="">Sélectionner un projet</option>
            {projetOptions.map((projet) => (
              <option key={projet.id} value={projet.id}>
                {projet.titre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date de Publication:</label>
          <input type="date" value={datePublication} onChange={e => setDatePublication(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Modifier' : 'Créer'}</button>
      </form>
    </div>
  );
};

export default PublicationForm;
