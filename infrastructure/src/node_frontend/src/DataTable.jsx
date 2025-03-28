import { useRef, useEffect, useState, useMemo } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); // Changement ici, on définit `editId` sur null au lieu de false
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(""); // Ajout de la gestion des erreurs
  const outsideClick = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!editId) return;
    let selectedItem = document.querySelector(`[id='${editId}']`);
    if (selectedItem) {
      selectedItem.focus();
    }
  }, [editId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideClick.current && !outsideClick.current.contains(event.target)) {
        setEditId(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // 📌 Nouveau useEffect : Récupérer les données depuis le serveur
  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.error("Erreur lors du chargement des données", err);
        setError("Erreur lors du chargement des données"); // Affichage d'un message d'erreur
      });
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = async () => {
    if (formData.name && formData.email && formData.phone) {
      const newItem = { name: formData.name, email: formData.email, phone: formData.phone };

      try {
        const res = await fetch("http://localhost:5000/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        const data = await res.json();
        setData((prevData) => [...prevData, data]);
        setFormData({ name: "", email: "", phone: "" });
      } catch (err) {
        console.error("Erreur lors de l'ajout", err);
        setError("Erreur lors de l'ajout de l'élément"); // Message d'erreur si l'ajout échoue
      }
    } else {
      setError("Tous les champs doivent être remplis"); // Message d'erreur si des champs sont manquants
    }
  };

  const handleEdit = (id, updatedData) => {
    if (!editId || editId !== id) return;

    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);

    fetch(`http://localhost:5000/api/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Données mises à jour", data))
      .catch((err) => {
        console.error("Erreur lors de la mise à jour", err);
        setError("Erreur lors de la mise à jour des données"); // Affichage d'une erreur de mise à jour
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/data/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression", err);
        setError("Erreur lors de la suppression de l'élément"); // Affichage d'une erreur de suppression
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = useMemo(() => {
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, searchTerm]);

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Nom"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="add"
          onClick={handleAddClick}
          disabled={!formData.name || !formData.email || !formData.phone}  // Désactivation si champs vides
        >
          Ajouter
        </button>
      </div>

      {error && <div className="error">{error}</div>}  {/* Affichage du message d'erreur */}

      <div className="search-table-container">
        <input
          className="search-input"
          type="text"
          placeholder="Recherche par nom"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td
                    id={item.id}
                    contentEditable={editId === item.id}
                    onBlur={(e) => handleEdit(item.id, { name: e.target.innerText })}
                  >
                    {item.name}
                  </td>
                  <td
                    id={`email-${item.id}`}
                    contentEditable={editId === item.id}
                    onBlur={(e) => handleEdit(item.id, { email: e.target.innerText })}
                  >
                    {item.email}
                  </td>
                  <td
                    id={`phone-${item.id}`}
                    contentEditable={editId === item.id}
                    onBlur={(e) => handleEdit(item.id, { phone: e.target.innerText })}
                  >
                    {item.phone}
                  </td>
                  <td className="actions">
                    <button className="edit" onClick={() => setEditId(item.id)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucune donnée disponible</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              style={{ backgroundColor: currentPage === index + 1 ? "lightgreen" : "" }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
