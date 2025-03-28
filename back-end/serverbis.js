// server.js
import express from 'express';
import cors from 'cors';  // Importer le middleware CORS
import ENV from './config/env.js';  // Importer la configuration

const app = express();  // Créer une instance d'Express

 Données fictives pour l'exemple
let data = [
  { id: 1, name: 'John', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane', email: 'jane@example.com', phone: '987-654-3210' },
   Ajoute d'autres éléments si nécessaire
];

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173',  // Autoriser les requêtes du frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));  // Appliquer CORS

app.use(express.json());  // Middleware pour parser les requêtes JSON

// Route GET pour récupérer toutes les données
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Route POST pour ajouter de nouvelles données
app.post('/api/data', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const newItem = {
    id: Date.now(),  // Générer un ID unique basé sur le temps
    name,
    email,
    phone,
  };

  data.push(newItem);  // Ajouter l'élément à la liste
  res.status(201).json(newItem);  // Retourner le nouvel élément ajouté
});

// Route DELETE pour supprimer un élément par ID
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter(item => item.id !== parseInt(id));  // Filtrer les données pour supprimer l'élément
  res.status(200).json({ message: 'Élément supprimé avec succès' });
});

// Démarrer le serveur
const PORT = ENV.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});