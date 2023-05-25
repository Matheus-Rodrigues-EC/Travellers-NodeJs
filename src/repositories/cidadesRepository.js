import { db } from './../config/db.js';

async function createCidade(nome, estado_id){

    const insert = `INSERT INTO "Cidades" (nome, estado_id)
                    VALUES ($1, $2);`
    const { rows } = await db.query(insert, [nome, estado_id]);
    return rows[0];
}

async function getCidades(nome){

    const select = `SELECT "Hoteis".nome as "Hospedagens",
                        "Companhia".nome as "Companhia",
                        "Passagens".data_saida as "Data_de_saida",
                        "Passagens".hora_saida as "Horário_de_saida",
                        "Passagens".data_chegada as "Data_de_chegada",
                        "Passagens".hora_chegada as "Horário_previsto_de_chegada",
                        "Passagens".valor as "Preço_por_passagem"
                    FROM "Rotas"
                    JOIN "Cidades" ON "Rotas".destino = "Cidades".id
                    JOIN "Hoteis" ON "Cidades".id = "Hoteis".cidade_id
                    JOIN "Passagens" ON "Rotas".id = "Passagens".rota_id
                    JOIN "Companhia" ON "Passagens".companhia_id = "Companhia".id
                    WHERE "Cidades".nome = $1`;
    const { rows } = await db.query(select, [nome]);

    return rows[0];
}

export {
    createCidade,
    getCidades
};