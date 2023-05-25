import { db } from "../config/db.js";

async function createComodidade(comodidade){
    
    const insert = `INSERT INTO "Comodidades" (comodidade)
                    VALUES ($1);`;
    const { rows } = await db.query(insert, [comodidade]);

    return rows[0];
}

export {
    createComodidade
}