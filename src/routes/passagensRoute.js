import express from 'express';
import cors from 'cors'

const ticket = express();
ticket.use(cors());
ticket.use(express.json());

import { getPassagemCidade } from '../controllers/passagensController.js';

ticket.get('/passagens/:cidade', getPassagemCidade);

export default ticket;