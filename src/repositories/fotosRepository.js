
import { db } from "../config/db.js";

async function createFoto(hotel_id, url){

    const insert = `INSERT INTO "Fotos" (hotel_id, foto)
                    VALUES ($1, $2);`;
    const { rows } = await db.query(insert, [hotel_id, url]);

    return rows[0];
}

export {
    createFoto
}