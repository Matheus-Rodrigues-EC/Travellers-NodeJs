import { getPassagens } from "../repositories/passagensRepository.js";

async function getPassagemCidade(req, res){
    const {cidade} = req.params;
    try{
        const passagens = await getPassagens(cidade);
        res.status(200).send(passagens);
    }catch(error){
        res.status(500).send(error.message);
    }
}

export{ 
    getPassagemCidade
}