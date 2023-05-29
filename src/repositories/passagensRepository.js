import { db } from "../config/db.js";

async function createPassagem(rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor){

    const insert = `INSERT INTO "Passagens" (rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const { rows } = await db.query(insert, [rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor]);

    return rows[0];
}

async function getPassagensList(){

    const selectList = `SELECT DISTINCT "Cidades".nome FROM "Cidades"
                        JOIN "Rotas" ON "Cidades".id = "Rotas".destino;
    `;
    const { rows } = await db.query(selectList);

    return rows;
}

async function getPassagenscidade(cidade){

    const selectList = `SELECT "Passagens".*, "Cidades".nome FROM "Passagens"
                        JOIN "Rotas" ON "Passagens".rota_id = "Rotas".id
                        JOIN "Cidades" ON "Rotas".origem = "Cidades".id
                        WHERE "Rotas".destino = (
                            SELECT id FROM "Cidades"
                            WHERE nome ilike $1);`;
    const { rows } = await db.query(selectList, [cidade]);

    return rows;
}

async function getPassagens(cidade){

    const select = `SELECT 	"Companhia".nome AS "Companhia",
                        "Passagens".id,
                        "Rotas".origem as "Destino",
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
    const passagens = await db.query(select, [cidade]);

    return passagens.rows;
}

async function getPassagemId(id, cidade){

    const select =  `SELECT 	"Companhia".nome AS "Companhia",
                    "Passagens".id,
                    "Rotas".destino as "Destino",
                    "Passagens".data_saida AS "Data_de_saida",
                    "Passagens".hora_saida AS "Hora_saida",
                    "Passagens".data_chegada AS "Data_de_chegada",
                    "Passagens".hora_chegada AS "Hora_prevista_chegada",
                    "Passagens".valor AS "Preco_passagem",
                    "Cidades".nome AS "Local_de_Partida"
                FROM "Cidades", "Rotas"
                JOIN "Passagens" ON "Rotas".id = "Passagens".rota_id
                JOIN "Companhia" ON "Passagens".companhia_id = "Companhia".id
                WHERE "Passagens".id = $1
                    AND ("Cidades".id = "Rotas".origem) 
                    AND ("Rotas".origem = (SELECT "Cidades".id FROM "Cidades" 
                                            WHERE "Cidades".nome ILIKE $2 )
                        )`;
    const passagem = await db.query(select, [id, cidade]);

    const selectDestino =  `SELECT "Cidades".nome FROM "Cidades"
                            JOIN "Rotas" ON "Cidades".id = "Rotas".destino
                            JOIN "Passagens" ON "Rotas".id = "Passagens".rota_id
                            WHERE "Passagens".id = $1 AND "Rotas".destino = $2`;
    const destino = await db.query(selectDestino, [id, passagem.rows[0].Destino]);
    const Dados = {Destino: destino.rows[0], Passagem: passagem.rows[0]}
    return Dados;
}

export {
    createPassagem,
    getPassagensList,
    getPassagenscidade,
    getPassagens,
    getPassagemId
}
