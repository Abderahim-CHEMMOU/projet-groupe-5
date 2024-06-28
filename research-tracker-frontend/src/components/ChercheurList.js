import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import Pagination from './Pagination';
import '../styles/ChercheurList.css';

Modal.setAppElement('#root'); // This is to avoid accessibility issues

const ChercheurList = () => {
  const [chercheurs, setChercheurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChercheur, setSelectedChercheur] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChercheurs();
  }, [currentPage, searchTerm]);

  const fetchChercheurs = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tracker/chercheurs/?nom=${searchTerm}&page=${currentPage}`);
      setChercheurs(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 7)); // Adjust the page size if different
    } catch (error) {
      console.error('There was an error fetching the chercheurs!', error);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1); // reset to first page on new search
  };

  const openModal = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tracker/chercheurs/${id}/`);
      setSelectedChercheur(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('There was an error fetching the chercheur details!', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedChercheur(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this chercheur?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/tracker/chercheurs/${id}/`);
        setCurrentPage(1); // reset to first page after deletion
        fetchChercheurs();
      } catch (error) {
        console.error('There was an error deleting the chercheur!', error);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="chercheur-list-container">
      <h1>Liste des Chercheurs</h1>
      <input
        type="text"
        placeholder="Rechercher un chercheur"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {chercheurs.map(chercheur => (
          <li key={chercheur.id}>
            {chercheur.nom} - {chercheur.specialite}
            <div>
              <button onClick={() => openModal(chercheur.id)}>Voir Détails</button>
              <button onClick={() => navigate(`/chercheurs/${chercheur.id}/edit`)}>Modifier</button>
              <button onClick={() => handleDelete(chercheur.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedChercheur && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <h2>Détails du Chercheur</h2>
          <p><strong>Nom:</strong> {selectedChercheur.nom}</p>
          <p><strong>Spécialité:</strong> {selectedChercheur.specialite}</p>
          <button onClick={closeModal}>Fermer</button>
        </Modal>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Link to="/chercheurs/new">
        <button>Ajouter un Chercheur</button>
      </Link>
    </div>
  );
};

export default ChercheurList;
