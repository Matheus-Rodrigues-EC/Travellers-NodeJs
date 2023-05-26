import express from 'express';
import cors from 'cors';

const home = express();
home.use(cors());
home.use(express.json());

import { All, cidades } from '../controllers/homeController.js';

home.get('/home', cidades);
home.get('/home/:cidade', All)

export default home;