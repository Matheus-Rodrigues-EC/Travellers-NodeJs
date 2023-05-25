import { db } from "../config/db.js";

async function createCompanhia(nome){
    const insert = `INSERT INTO "Companhia" (nome)
                    VALUES ($1);`;
    const { rows } = await db.query(insert, [nome]);

    return rows[0];
}

export {
    createCompanhia
}