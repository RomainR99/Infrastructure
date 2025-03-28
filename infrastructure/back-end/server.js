// server.js
import app from './app.js'  // Importer l'instance Express depuis app.js
import ENV from './config/env.js'  // Importer la configuration

// // Données fictives pour l'exemple
// let data = [
//   { id: 1, name: 'John', email: 'john@example.com', phone: '123-456-7890' },
//   { id: 2, name: 'Jane', email: 'jane@example.com', phone: '987-654-3210' },
//   // Ajoute d'autres éléments si nécessaire
// ];

// // Route DELETE pour supprimer un élément par ID
// app.delete('/api/data/:id', (req, res) => {
//   const { id } = req.params;
//   // Supprimer l'élément avec l'ID fourni
//   data = data.filter(item => item.id !== parseInt(id));
//   res.status(200).json({ message: 'Élément supprimé avec succès' });
// });

// Démarrer le serveur
const PORT = ENV.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log("🔍 URI MongoDB utilisée :", ENV.URI_MONGO);
