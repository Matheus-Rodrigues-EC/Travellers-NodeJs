import { getAll, getCidades } from "../repositories/cidadesRepository.js";

async function cidades(req, res){
    try{
        const cidades = await getCidades();
        res.status(200).send(cidades);
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function All(req, res){
    const {cidade} = req.params;
    try{
        const cidades = await getAll(cidade);
        res.status(200).send(cidades);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export {
    cidades,
    All
}