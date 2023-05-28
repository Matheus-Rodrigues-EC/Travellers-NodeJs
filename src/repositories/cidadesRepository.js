import { db } from './../config/db.js';

// Adiciona uma cidade ao banco
async function createCidade(nome){

    const insert = `INSERT INTO "Cidades" (nome)
                    VALUES ($1);`
    const { rows } = await db.query(insert, [nome]);
    return rows[0];
}

// Faz uma busca de todas as cidades
async function getCidades(){

    const select = `SELECT nome FROM "Cidades"`
    const { rows } = await db.query(select);
    return rows;
}

// Busca Hospedagens e Passagens para a cidade selecionada
async function getAll(nome){

    const selectHoteis =   `SELECT "Hoteis".id, "Hoteis".nome, "Hoteis".diaria FROM "Hoteis"
                            JOIN "Cidades" ON "Hoteis".cidade_id = "Cidades".id
                            WHERE "Cidades".nome ILIKE $1;`;
    const hoteis = await db.query(selectHoteis, [nome]);

    const selectPassagens = `SELECT 	"Companhia".nome AS "Companhia",
                                "Passagens".id,
                                "Passagens".data_saida AS "Data_de_saida",
                                "Passagens".hora_saida AS "Hora_saida",
                                "Passagens".data_chegada AS "Data_de_chegada",
                                "Passagens".hora_chegada AS "Hora_prevista_chegada",
                                "Passagens".valor AS "Preco_passagem",
                                "Cidades".nome AS "Local_Partida"
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
    getCidades,
    getAll
};