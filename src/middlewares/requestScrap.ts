//teste aguardando a API de webscraping para fazer os requests
import axios from "axios";
import { NextFunction } from "express";
import { Inews } from "../interfaces/Inews";

//url da api que faz webscraping
const URL = ''

export default function (req: any, res: any, next: NextFunction) {
    axios.get(URL)
        .then((response) => {
            const data:Inews[]=response.data
            res.send(data);
        })
        .catch((error) => { next(error) })

};