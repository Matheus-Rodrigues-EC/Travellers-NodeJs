import { db } from './../config/db.js';

async function createCidade(nome, estado_id){

    const insert = `INSERT INTO "Cidades" (nome, estado_id)
                    VALUES ($1, $2);`
    const { rows } = await db.query(insert, [nome, estado_id]);
    return rows[0];
}

async function getCidades(nome){

    const selectHoteis =   `SELECT "Hoteis".nome, "Hoteis".diaria FROM "Hoteis"
                            JOIN "Cidades" ON "Hoteis".cidade_id = "Cidades".id
                            WHERE "Cidades".nome ILIKE $1;`;
    const hoteis = await db.query(selectHoteis, [nome]);

    const selectPassagens = `SELECT 	"Companhia".nome AS "Companhia",
                                "Passagens".data_saida AS "Data_de_saida",
                                "Passagens".hora_saida AS "Horário_de_saida",
                                "Passagens".data_chegada AS "Data_de_chegada",
                                "Passagens".hora_chegada AS "Horário_previsto_de_chegada",
                                "Passagens".valor AS "Preço_por_passagem",
                                "Cidades".nome AS "Local_de_Partida"
                            FROM "Cidades", "Rotas"
                            JOIN "Passagens" ON "Rotas".id = "Passagens".rota_id
                            JOIN "Companhia" ON "Passagens".companhia_id = "Companhia".id
                            WHERE "Cidades".nome != $1
                                AND ("Cidades".id = "Rotas".origem) 
                                AND ("Rotas".destino = (SELECT "Cidades".id FROM "Cidades" 
                                                        WHERE "Cidades".nome ILIKE $1 )
                                    )`;
    const passagens = await db.query(selectPassagens, [nome]);

    const Lista = {Hoteis: hoteis.rows, Passagens: passagens.rows};

    return Lista;
}

export {
    createCidade,
    getCidades
};