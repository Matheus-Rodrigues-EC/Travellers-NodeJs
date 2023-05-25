import express from 'express';
import cors from 'cors';

const home = express();
home.use(cors());
home.use(express.json());

import { Exibir } from '../controllers/homeController.js';

home.get('/home', Exibir);

export default home;