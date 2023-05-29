import { db } from "../config/db.js";

async function createHoteis(nome, endereco, descricao, diaria, disponiveis, cidade_id){

    const insert = `INSERT INTO "Hoteis" (nome, endereco, descricao, diaria, disponiveis, cidade_id)
                    VALUES ($1, $2, $3, $4, $5, $6);`;
    const { rows } = await db.query(insert, [nome, endereco, descricao, diaria, disponiveis, cidade_id]);

    return rows[0];
}

// Buscar hotel por nome do hotel
async function getHotel(id){

    const selectDados =    `SELECT "Hoteis".* FROM "Hoteis"
                            WHERE "Hoteis".id = $1;`;
    const dados = await db.query(selectDados, [id]);

    const selectComodidades =  `SELECT "Comodidades".comodidade FROM "Hoteis"
                                JOIN "Cidades" ON "Hoteis".cidade_id = "Cidades".id
                                JOIN "Lista_Comodidade" ON "Hoteis".id = "Lista_Comodidade".hotel_id
                                JOIN "Comodidades" ON "Lista_Comodidade".comodidade_id = "Comodidades".id
                                WHERE "Hoteis".id = $1;`;
    const comodidades = await db.query(selectComodidades, [id]);

    const selectFotos =     `SELECT foto FROM "Fotos"
                            WHERE hotel_id = $1`;
    const fotos = await db.query(selectFotos, [id])

    const hoteis = {Dados: dados.rows, Comodidades: comodidades.rows, Fotos: fotos.rows};

    return hoteis;
}

async function getHoteis(cidade){

    const selectHoteis =   `SELECT "Hoteis".nome, "Hoteis".diaria FROM "Hoteis"
                            JOIN "Cidades" ON "Hoteis".cidade_id = "Cidades".id
                            WHERE "Cidades".nome ILIKE $1`
    const hoteis = await db.query(selectHoteis, [cidade]);

    return hoteis.rows;
}

async function ListHoteis(){

    const selectHoteis =   `SELECT "Cidades".nome as "Cidade", 
                            "Hoteis".nome as "Hotel"
                            FROM "Cidades", "Hoteis"
                            WHERE "Cidades".id = "Hoteis".cidade_id;`
    const hoteis = await db.query(selectHoteis);

    return hoteis.rows;
}


export {
    createHoteis,
    getHotel,
    ListHoteis,
    getHoteis
}