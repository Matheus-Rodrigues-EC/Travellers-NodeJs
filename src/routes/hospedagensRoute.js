import express from 'express';
import cors from 'cors';

const host = express();
host.use(cors());
host.use(express.json());

import { getHotelNome, getHoteisCidade } from '../controllers/hospedagensController.js';

host.get('/hoteis', getHotelNome);
host.get('/hoteis/:cidade', getHoteisCidade);

export default host;