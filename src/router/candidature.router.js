import express from 'express'
const router = express.Router();
const candidatureController = require('../controllers/candidature.controllers')


router.post('/', candidatureController.createCandidature);
router.get('/', candidatureController.getCandidature);
router.put('/:id', candidatureController.updateCandidature);
router.delete('/:id', candidatureController.deleteCandidature);

export default router;