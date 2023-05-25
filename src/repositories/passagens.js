import { db } from "../config/db.js";

async function createPassagem(rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor){

    const insert = `INSERT INTO "Passagens" (rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const { rows } = await db.query(insert, [rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor]);

    return rows[0];
}

export {
    createPassagem
}
