import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import api from '../api';
import Pagination from './Pagination';
import '../styles/PublicationList.css';

Modal.setAppElement('#root'); // This is to avoid accessibility issues

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPublications();
  }, [currentPage, searchTerm]);

  const fetchPublications = async () => {
    try {
      const response = await api.get(`/publications/?page=${currentPage}&titre=${searchTerm}`);
      const data = response.data;
      setPublications(data.results);
      setTotalPages(Math.ceil(data.count / 7)); // assuming 7 items per page as per your settings
    } catch (error) {
      console.error('There was an error fetching the publications!', error);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1); // reset to first page on new search
  };

  const openModal = async (id) => {
    try {
      const response = await api.get(`/publications/${id}/`);
      setSelectedPublication(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('There was an error fetching the publication details!', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPublication(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await api.delete(`/publications/${id}/`);
        setCurrentPage(1); // reset to first page after deletion
        fetchPublications();
      } catch (error) {
        console.error('There was an error deleting the publication!', error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="publication-list-container">
      <h1>Liste des Publications</h1>
      <input
        type="text"
        placeholder="Rechercher une publication"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {publications.map((publication) => (
          <li key={publication.id}>
            <span>{publication.titre} - {publication.resume}</span>
            <div className="button-group">
              <button onClick={() => openModal(publication.id)}>Voir Détails</button>
              <Link to={`/publications/${publication.id}/edit`}>Modifier</Link>
              <button className="button-delete" onClick={() => handleDelete(publication.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>


      {selectedPublication && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Détails de la Publication</h2>
          <p><strong>Titre:</strong> {selectedPublication.titre}</p>
          <p><strong>Résumé:</strong> {selectedPublication.resume}</p>
          <p><strong>Date de Publication:</strong> {selectedPublication.date_publication}</p>
          <p><strong>Projet:</strong> {selectedPublication.projet.titre}</p>
          <button onClick={closeModal}>Fermer</button>
        </Modal>
      )}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
       <Link to="/publications/new" className="create-button">Créer une Publication</Link>
    </div>
  );
};

export default PublicationList;
