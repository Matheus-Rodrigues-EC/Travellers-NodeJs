import express from 'express';
import cors from 'cors';

const host = express();
host.use(cors());
host.use(express.json());

import { getHoteislist, getHotelNome, getHoteisCidade } from '../controllers/hospedagensController.js';

host.get('/hoteis', getHoteislist);
host.get('/hotel/:id', getHotelNome);
host.get('/hoteis/:cidade', getHoteisCidade);

export default host;