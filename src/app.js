import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// imports




app.listen(process.env.PORT, () => {
    console.log('Server is running at port: ' + process.env.PORT);
})