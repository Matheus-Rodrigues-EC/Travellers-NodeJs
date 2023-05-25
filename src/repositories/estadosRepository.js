import { db } from './../config/db.js';

async function createEstado(name, sigla){

    const insert = `INSERT INTO "Estados" (nome, sigla)
                    VALUES ($1, $2);`
    const { rows } = await db.query(insert, [name, sigla]);
    return rows[0];
}

export default { createEstado };