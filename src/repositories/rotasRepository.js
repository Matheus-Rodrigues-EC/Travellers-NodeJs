import { db } from "../config/db.js";

async function createRotas(origem, destino){

    const insert = `INSERT INTO "Rotas" (origem, destino)
                    VALUES ($1, $2);`;
    const { rows } = await db.query(insert, [origem, destino]);

    return rows[0];
}

export {
    createRotas
}