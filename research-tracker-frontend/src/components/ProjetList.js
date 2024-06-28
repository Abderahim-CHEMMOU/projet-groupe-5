import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../api';
import '../styles/ProjetList.css';
import Pagination from './Pagination';

Modal.setAppElement('#root'); // This is to avoid accessibility issues

const ProjetList = () => {
  const [projets, setProjets] = useState([]);
  const [selectedProjet, setSelectedProjet] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(7); // Assumons que la taille de la page est 7
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjets();
  }, [currentPage, searchTerm]);

  const fetchProjets = async () => {
    try {
      const response = await api.get(`/projets/?page=${currentPage}&titre=${searchTerm}`);
      setProjets(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize)); // Calcul du nombre total de pages
    } catch (error) {
      console.error('There was an error fetching the projets!', error);
    }
  };

  const openModal = async (id) => {
    try {
      const response = await api.get(`/projets/${id}/`);
      setSelectedProjet(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('There was an error fetching the projet details!', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProjet(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this projet?')) {
      try {
        await api.delete(`/projets/${id}/`);
        setCurrentPage(1); // Rediriger vers la première page après suppression
        fetchProjets();
      } catch (error) {
        console.error('There was an error deleting the projet!', error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="projet-list-container">
      <h1>Liste des Projets</h1>
      <input
        type="text"
        placeholder="Rechercher un projet"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {projets.map((projet) => (
          <li key={projet.id}>
            {projet.titre} - {projet.description}
            <div>
              <button onClick={() => openModal(projet.id)}>Voir Détails</button>
              <button onClick={() => navigate(`/projets/${projet.id}/edit`)}>Modifier</button>
              <button onClick={() => handleDelete(projet.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/projets/new">Créer un Projet</Link>

      {selectedProjet && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content">
          <h2>Détails du Projet</h2>
          <p><strong>Titre:</strong> {selectedProjet.titre}</p>
          <p><strong>Description:</strong> {selectedProjet.description}</p>
          <p><strong>Date de début:</strong> {selectedProjet.date_debut}</p>
          <p><strong>Date de fin prévue:</strong> {selectedProjet.date_fin_prevue}</p>
          <p><strong>Chef de projet:</strong> {selectedProjet.chef_de_projet.nom}</p>
          <p><strong>Chercheurs:</strong></p>
          <ul>
            {selectedProjet.chercheurs.map((chercheur) => (
              <li key={chercheur.id}>{chercheur.nom}</li>
            ))}
          </ul>
          <button onClick={closeModal}>Fermer</button>
        </Modal>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProjetList;
