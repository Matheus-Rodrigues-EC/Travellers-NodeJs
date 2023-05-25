import { getPassagens } from "../repositories/passagensRepository.js";

async function Exibir(req, res){
    const {nome} = req.body;
    try{
        const passagens = await getPassagens(nome);
        res.status(200).send(passagens);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export{ 
    Exibir
}