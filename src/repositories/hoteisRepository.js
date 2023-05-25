import { db } from "../config/db.js";

async function createHoteis(nome, endereco, descricao, diaria, disponiveis, cidade_id){

    const insert = `INSERT INTO "Hoteis" (nome, endereco, descricao, diaria, disponiveis, cidade_id)
                    VALUES ($1, $2, $3, $4, $5, $6);`;
    const { rows } = await db.query(insert, [nome, endereco, descricao, diaria, disponiveis, cidade_id]);

    return rows[0];
}

export {
    createHoteis
}