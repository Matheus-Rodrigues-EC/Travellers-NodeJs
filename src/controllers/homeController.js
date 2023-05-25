import { getCidades } from "../repositories/cidadesRepository.js";

async function Exibir(req, res){
    const {nome} = req.body;
    try{
        const cidades = await getCidades(nome);
        res.status(200).send(cidades);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export {
    Exibir
}