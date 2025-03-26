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

export const deleateCandidature = (req,res) => {
    
}

export const updateCandidature = (req,res) => {
    
}