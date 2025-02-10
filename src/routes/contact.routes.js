import express from 'express';  
import { identifyContact } from '../controllers/contact.controller.js';

const router = express.Router();  

router.get('/identify', identifyContact);  

export default router;