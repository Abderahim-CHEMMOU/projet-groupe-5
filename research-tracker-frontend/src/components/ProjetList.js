
// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api';
// import '../styles/ProjetList.css';
// import Pagination from './Pagination';

// Modal.setAppElement('#root'); // This is to avoid accessibility issues

// const ProjetList = () => {
//   const [projets, setProjets] = useState([]);
//   const [selectedProjet, setSelectedProjet] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageSize, setPageSize] = useState(7); // Assumons que la taille de la page est 7
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProjets();
//   }, [currentPage, searchTerm]);

//   const fetchProjets = async () => {
//     try {
//       const response = await api.get(`/projets/?page=${currentPage}&titre=${searchTerm}`);
//       setProjets(response.data.results);
//       setTotalPages(Math.ceil(response.data.count / pageSize)); // Calcul du nombre total de pages
//     } catch (error) {
//       console.error('There was an error fetching the projets!', error);
//     }
//   };

//   const openModal = async (id) => {
//     try {
//       const response = await api.get(`/projets/${id}/`);
//       setSelectedProjet(response.data);
//       setModalIsOpen(true);
//     } catch (error) {
//       console.error('There was an error fetching the projet details!', error);
//     }
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedProjet(null);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this projet?')) {
//       try {
//         await api.delete(`/projets/${id}/`);
//         setCurrentPage(1); // Rediriger vers la première page après suppression
//         fetchProjets();
//       } catch (error) {
//         console.error('There was an error deleting the projet!', error);
//       }
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="projet-list-container">
//       <h1 className="projet-list-title">Liste des Projets</h1>
//       <input
//         type="text"
//         placeholder="Rechercher un projet"
//         value={searchTerm}
//         onChange={handleSearch}
//         className="projet-list-search"
//       />
//       <ul className="projet-list">
//         {projets.map((projet) => (
//           <li key={projet.id} className="projet-list-item">
//             {projet.titre} - {projet.description}
//             <div className="button-group">
//               <button onClick={() => openModal(projet.id)} className="details-button">Voir Détails</button>
//               <button onClick={() => navigate(`/projets/${projet.id}/edit`)} className="modify-button">Modifier</button>
//               <button onClick={() => handleDelete(projet.id)} className="button-delete">Supprimer</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {selectedProjet && (
//         <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
//           <h2 className="modal-title">Détails du Projet</h2>
//           <p className="modal-content"><strong>Titre:</strong> {selectedProjet.titre}</p>
//           <p className="modal-content"><strong>Description:</strong> {selectedProjet.description}</p>
//           <p className="modal-content"><strong>Date de début:</strong> {selectedProjet.date_debut}</p>
//           <p className="modal-content"><strong>Date de fin prévue:</strong> {selectedProjet.date_fin_prevue}</p>
//           <p className="modal-content"><strong>Chef de projet:</strong> {selectedProjet.chef_de_projet.nom}</p>
//           <p className="modal-content"><strong>Chercheurs:</strong></p>
//           <ul className="modal-chercheur-list">
//             {selectedProjet.chercheurs.map((chercheur) => (
//               <li key={chercheur.id} className="modal-chercheur-list-item">{chercheur.nom}</li>
//             ))}
//           </ul>
//           <button onClick={closeModal} className="modal-close-button">Fermer</button>
//         </Modal>
//       )}
//       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="pagination" />
//       <Link to="/projets/new" className="create-projet-link">Créer un Projet</Link>

//     </div>
//   );
// };

// export default ProjetList;


import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
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
      <h1 className="projet-list-title">Liste des Projets</h1>
      <input
        type="text"
        placeholder="Rechercher un projet"
        value={searchTerm}
        onChange={handleSearch}
        className="projet-list-search"
      />
      <ul className="projet-list">
        {projets.map((projet) => (
          <li key={projet.id} className="projet-list-item">
            {projet.titre} - {projet.description}
            <div className="button-group">
              <button onClick={() => openModal(projet.id)} className="details-button">Voir Détails</button>
              <button onClick={() => navigate(`/projets/${projet.id}/edit`)} className="modify-button">Modifier</button>
              <button onClick={() => handleDelete(projet.id)} className="button-delete">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedProjet && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
          <h2 className="modal-title">Détails du Projet</h2>
          <p className="modal-content"><strong>Titre:</strong> {selectedProjet.titre}</p>
          <p className="modal-content"><strong>Description:</strong> {selectedProjet.description}</p>
          <p className="modal-content"><strong>Date de début:</strong> {selectedProjet.date_debut}</p>
          <p className="modal-content"><strong>Date de fin prévue:</strong> {selectedProjet.date_fin_prevue}</p>
          <p className="modal-content"><strong>Chef de projet:</strong> {selectedProjet.chef_de_projet.nom}</p>
          <p className="modal-content"><strong>Chercheurs:</strong></p>
          <ul className="modal-chercheur-list">
            {selectedProjet.chercheurs.map((chercheur) => (
              <li key={chercheur.id} className="modal-chercheur-list-item">{chercheur.nom}</li>
            ))}
          </ul>
          <button onClick={closeModal} className="modal-close-button">Fermer</button>
        </Modal>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="pagination" />
      <Link to="/projets/new" className="create-projet-button">Créer un Projet</Link>

    </div>
  );
};

export default ProjetList;
