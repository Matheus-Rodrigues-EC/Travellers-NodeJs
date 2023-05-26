import { getHotel, getHoteis } from "../repositories/hoteisRepository.js";

async function getHotelNome(req, res){
    const {nome} = req.body;
    try{
        const hoteis = await getHotel(nome);
        res.status(200).send(hoteis);
    }catch(error){
        res.status(500).send(error.message);
    }
}

async function getHoteisCidade(req, res){
    const {cidade} = req.params;
    try{
        const hoteis = await getHoteis(cidade);
        res.status(200).send(hoteis);
    }catch(error){
        res.status(500).send(error.message);
    }
}


export {
    getHotelNome,
    getHoteisCidade
}