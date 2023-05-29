import express from 'express';
import cors from 'cors'

const ticket = express();
ticket.use(cors());
ticket.use(express.json());

import { getPassagensListaCidade, getPassagem, getPassagensLista } from '../controllers/passagensController.js';

ticket.get('/passagens', getPassagensLista);
ticket.get('/passagens/:cidade', getPassagensListaCidade);
ticket.get('/passagem/:id', getPassagem);


export default ticket;