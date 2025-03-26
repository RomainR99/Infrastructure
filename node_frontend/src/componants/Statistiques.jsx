import { useEffect, useState } from "react";

const Statistiques = () => {
  const [stats, setStats] = useState({ total: 0, enAttente: 0, acceptees: 0, refusees: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement stats", err));
  }, []);

  return (
    <div>
      <h2>Statistiques</h2>
      <p>Total : {stats.total}</p>
      <p>En attente : {stats.enAttente}</p>
      <p>Acceptées : {stats.acceptees}</p>
      <p>Refusées : {stats.refusees}</p>
    </div>
  );
};

export default Statistiques;
