import candidatureModel from "../models/candidature.model";

export const createCandidature = async (req, res) => {
    try{

       const response = await candidatureModel.create(req.body)
        res.status(201).json({message: 'a été ajouter', response})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getCandidature = async (req, res) => {
    try {
        const response = await candidatureModel.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const updateCandidature = async (req, res) => {
    try {
        const response = await candidatureModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: message})
    }
}

export const deleteCandidature = async (req, res) => {
    try {
        await response.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

