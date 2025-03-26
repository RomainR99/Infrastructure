import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjoutCandidature = () => {
  const [form, setForm] = useState({ entreprise: "", poste: "", statut: "En attente" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/candidatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => navigate("/"))
      .catch((err) => console.error("Erreur ajout candidature", err));
  };

  return (
    <div>
      <h2>Ajouter une Candidature</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="entreprise" placeholder="Entreprise" onChange={handleChange} required />
        <input type="text" name="poste" placeholder="Poste" onChange={handleChange} required />
        <select name="statut" onChange={handleChange}>
          <option value="En attente">En attente</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Refusée">Refusée</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AjoutCandidature;
