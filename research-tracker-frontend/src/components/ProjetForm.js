// src/components/ProjetForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/ProjetForm.css';

const ProjetForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevue, setDateFinPrevue] = useState('');
  const [chefDeProjet, setChefDeProjet] = useState('');
  const [chercheurs, setChercheurs] = useState([]);
  const [chercheursOptions, setChercheursOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchChercheurs();
    if (id) {
      fetchProjet(id);
    }
  }, [id]);

  const fetchChercheurs = async () => {
    try {
      const response = await api.get('/chercheurs/');
      setChercheursOptions(response.data.results);
      console.log("Chercheurs fetched: ", response.data);
    } catch (error) {
      console.error('There was an error fetching the chercheurs!', error);
    }
  };

  const fetchProjet = async (id) => {
    try {
      const response = await api.get(`/projets/${id}/`);
      const projet = response.data;
      setTitre(projet.titre);
      setDescription(projet.description);
      setDateDebut(projet.date_debut);
      setDateFinPrevue(projet.date_fin_prevue);
      setChefDeProjet(projet.chef_de_projet.id);
      setChercheurs(projet.chercheurs.map(c => c.id));
    } catch (error) {
      console.error('There was an error fetching the projet!', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projetData = {
      titre,
      description,
      date_debut: dateDebut,
      date_fin_prevue: dateFinPrevue,
      chef_de_projet: chefDeProjet,
      chercheurs
    };

    try {
      if (id) {
        await api.put(`/projets/${id}/`, projetData);
      } else {
        await api.post('/projets/', projetData);
      }
      navigate('/projets');
    } catch (error) {
      console.error('There was an error saving the projet!', error);
    }
  };

  return (
    <div className="projet-form-container">
      <h1>{id ? 'Modifier' : 'Créer'} un Projet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input type="text" value={titre} onChange={e => setTitre(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Date de début:</label>
          <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} required />
        </div>
        <div>
          <label>Date de fin prévue:</label>
          <input type="date" value={dateFinPrevue} onChange={e => setDateFinPrevue(e.target.value)} required />
        </div>
        <div>
          <label>Chef de projet:</label>
          <select value={chefDeProjet} onChange={e => setChefDeProjet(e.target.value)} required>
            <option value="">Sélectionnez un chef de projet</option>
            {chercheursOptions.map((chercheur) => (
              <option key={chercheur.id} value={chercheur.id}>
                {chercheur.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Chercheurs:</label>
          <select multiple value={chercheurs} onChange={e => setChercheurs(Array.from(e.target.selectedOptions, option => option.value))} required>
            {chercheursOptions.map((chercheur) => (
              <option key={chercheur.id} value={chercheur.id}>
                {chercheur.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{id ? 'Modifier' : 'Créer'}</button>
      </form>
    </div>
  );
};

export default ProjetForm;
