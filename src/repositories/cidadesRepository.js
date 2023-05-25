import { db } from './../config/db.js';

async function createCidade(nome, estado_id){

    const insert = `INSERT INTO "Cidades" (nome, estado_id)
                    VALUES ($1, $2);`
    const { rows } = await db.query(insert, [nome, estado_id]);
    return rows[0];
}

async function getCidades(nome){

    const select = `SELECT 	"Cidades".nome as "Cidade", 
                            "Hoteis".nome as "Hotel", 
                            "Quartos".disponivel, 
                            "Quartos".id as "Número_do_Quarto", 
                            "Fotos".id as "Foto ID",
                            "Fotos".foto as "url",
                            "Rotas".destino as "Destino",
                            "Companhia".nome as "Companhia",
                            "Passagens".hora_saida as "Data_de_partida",
                            "Passagens".hora_chegada as "Data_de_chegada",
                            "Passagens".valor as "Preço"
                    FROM "Cidades"
                    JOIN "Hoteis" ON "Cidades".id = "Hoteis".cidade_id
                    JOIN "Quartos" ON "Hoteis".id = "Quartos".hotel_id
                    JOIN "Fotos" ON "Hoteis".id = "Fotos".hotel_id
                    JOIN "Rotas" ON "Cidades".id = "Rotas".destino
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