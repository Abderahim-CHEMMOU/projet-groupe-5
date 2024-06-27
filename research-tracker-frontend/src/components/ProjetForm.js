// src/components/ProjetForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const ProjetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFinPrevue, setDateFinPrevue] = useState('');
  const [chefDeProjet, setChefDeProjet] = useState('');
  const [chercheurs, setChercheurs] = useState([]);
  const [chercheurOptions, setChercheurOptions] = useState([]);

  useEffect(() => {
    const fetchChercheurs = async () => {
      try {
        const response = await api.get('/chercheurs/');
        setChercheurOptions(response.data);
      } catch (error) {
        console.error('There was an error fetching the chercheurs!', error);
      }
    };

    fetchChercheurs();

    if (id) {
      api.get(`/projets/${id}/`)
        .then(response => {
          setTitre(response.data.titre);
          setDescription(response.data.description);
          setDateDebut(response.data.date_debut);
          setDateFinPrevue(response.data.date_fin_prevue);
          setChefDeProjet(response.data.chef_de_projet);
          setChercheurs(response.data.chercheurs);
        })
        .catch(error => console.error('There was an error fetching the projet!', error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      titre,
      description,
      date_debut: dateDebut,
      date_fin_prevue: dateFinPrevue,
      chef_de_projet: chefDeProjet,
      chercheurs
    };
    const url = id ? `/projets/${id}/` : '/projets/';
    const method = id ? 'put' : 'post';

    try {
      await api[method](url, data);
      alert('Projet sauvegardé avec succès!');
      navigate('/projets');
    } catch (error) {
      console.error('There was an error saving the projet!', error);
    }
  };

  return (
    <div>
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
          <label>Date de Début:</label>
          <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} required />
        </div>
        <div>
          <label>Date de Fin Prévue:</label>
          <input type="date" value={dateFinPrevue} onChange={e => setDateFinPrevue(e.target.value)} required />
        </div>
        <div>
          <label>Chef de Projet:</label>
          <select value={chefDeProjet} onChange={e => setChefDeProjet(e.target.value)} required>
            <option value="">Sélectionner un chef de projet</option>
            {chercheurOptions.map((chercheur) => (
              <option key={chercheur.id} value={chercheur.id}>
                {chercheur.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Chercheurs:</label>
          {chercheurOptions.map((chercheur) => (
            <div key={chercheur.id}>
              <label>
                <input
                  type="checkbox"
                  value={chercheur.id}
                  checked={chercheurs.includes(chercheur.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setChercheurs([...chercheurs, chercheur.id]);
                    } else {
                      setChercheurs(chercheurs.filter((id) => id !== chercheur.id));
                    }
                  }}
                />
                {chercheur.nom}
              </label>
            </div>
          ))}
        </div>
        <button type="submit">{id ? 'Modifier' : 'Créer'}</button>
      </form>
    </div>
  );
};

export default ProjetForm;
