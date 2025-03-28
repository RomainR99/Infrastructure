import express from 'express'
import { createCandidature, readCandidature } from '../controllers/candidatures.controller.js';

const router = express.Router();

router.post('/post', createCandidature);//changer en post car post dans postman
router.get('/get', readCandidature); //depart le controller on fait la route on peut aller dans postman

export default router;
          