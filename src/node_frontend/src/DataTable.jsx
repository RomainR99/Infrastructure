import { useRef, useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
        setEditId(false);
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
      .catch((err) => console.error("Erreur lors du chargement des données", err));
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (formData.name && formData.email && formData.phone) {
      const newItem = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })
        .then((res) => res.json())
        .then((data) => {
          setData((prevData) => [...prevData, data]);
          setFormData({ name: "", email: "", phone: "" });
        })
        .catch((err) => console.error("Erreur lors de l'ajout", err));
    }
  };

  const handleEdit = (id, updatedData) => {
    if (!editId || editId !== id) {
      return;
    }

    const updatedList = data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setData(updatedList);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/data/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Erreur lors de la suppression", err));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredData = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input type="text" placeholder="Nom" name="name" value={formData.name} onChange={handleInputChange} />
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
          <input type="text" placeholder="Téléphone" name="phone" value={formData.phone} onChange={handleInputChange} />
        </div>
        <button className="add" onClick={handleAddClick}>Ajouter</button>
      </div>

      <div className="search-table-container">
        <input className="search-input" type="text" placeholder="Recherche par nom" value={searchTerm} onChange={handleSearch} />
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
            {filteredData.map((item) => (
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
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
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
