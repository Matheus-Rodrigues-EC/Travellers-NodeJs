import { getHotel, getHoteis } from "../repositories/hoteisRepository.js";

async function getHotelNome(req, res){
    const {id} = req.params;

    try{
        const hoteis = await getHotel(id);
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