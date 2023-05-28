import express from 'express';
import cors from 'cors'

const ticket = express();
ticket.use(cors());
ticket.use(express.json());

import { getPassagemCidade, getPassagem } from '../controllers/passagensController.js';

ticket.get('/passagens/:cidade', getPassagemCidade);
ticket.get('/passagem/:id', getPassagem);


export default ticket;