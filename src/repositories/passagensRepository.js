import { db } from "../config/db.js";

async function createPassagem(rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor){

    const insert = `INSERT INTO "Passagens" (rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const { rows } = await db.query(insert, [rota_id, companhia_id, data_saida, hora_saida, data_chegada, hora_chegada, valor]);

    return rows[0];
}

async function getPassagens(cidade){

    const select = `SELECT 	"Companhia".nome AS "Companhia",
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

export {
    createPassagem,
    getPassagens
}
