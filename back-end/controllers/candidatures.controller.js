import ModelCandidature from '../models/candidatures.model.js'

export const createCandidature = async (req,res) => {
    try {
        console.log("A",req.body);//on rajoute pour tester postman il fau ajouter un middleware
        // requete post
        const response = await ModelCandidature.create(req.body) //req.body est l'objet qu'il doit mettre dans la BDD
        res.status(201).json({ message: 'a été ajouté', response})//on voit ce qui a été ajouté dans la bdd
    }   catch (error) { //om met error.message pour bien récupérer le message
        res.status(500).json(error.message)      
    }

}

export const readCandidature = async (req,res) => {
    try {
        console.log("B",req.body);//on rajoute pour tester postman il fau ajouter un middleware
        // requete post
        const response = await ModelCandidature.find(req.body) //find pour lire
        res.status(201).json(response)//on voit ce qui a été ajouté dans la bdd
    }   catch (error) { //om met error.message pour bien récupérer le message
        res.status(500).json(error.message)      
    }
}

export const deleteCandidature = async (req, res) => {
    try {
        const { id } = req.params;  // Récupère l'ID de la candidature à supprimer

        // Vérifie si la candidature existe
        const candidature = await ModelCandidature.findById(id);
        if (!candidature) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }

        // Supprime la candidature
        await ModelCandidature.findByIdAndDelete(id);

        // Retourne une réponse après la suppression
        res.status(200).json({ message: 'Candidature supprimée avec succès' });

    } catch (error) {
        // Gestion d'erreur avec message détaillé
        console.error(error);  // Affiche l'erreur dans la console du serveur
        res.status(500).json({ message: 'Erreur lors de la suppression de la candidature', error: error.message });
    }
}

export const updateCandidature = async (req, res) => {
    try {
        const { id } = req.params;  // Récupère l'ID de la candidature à mettre à jour

        // Vérifie si la candidature existe
        const candidature = await ModelCandidature.findById(id);
        if (!candidature) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }

        // Met à jour la candidature avec les nouvelles données
        const updatedCandidature = await ModelCandidature.findByIdAndUpdate(id, req.body, { new: true });

        // Retourne la candidature mise à jour
        res.status(200).json({ message: 'Candidature mise à jour avec succès', updatedCandidature });

    } catch (error) {
        // Gestion d'erreur avec message détaillé
        console.error(error);  // Affiche l'erreur dans la console du serveur
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la candidature', error: error.message });
    }
}