import express from 'express';
import cors from 'cors'

const ticket = express();
ticket.use(cors());
ticket.use(express.json());

import { Exibir } from '../controllers/passagensController.js';

ticket.get('/passagens', Exibir);

export default ticket;