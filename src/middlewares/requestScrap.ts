//teste aguardando a API de webscraping para fazer os requests
import axios from "axios";
import { NextFunction } from "express";

//url
const URL = 'https://jojo-api.herokuapp.com/jojostands/'

export default function (req: any, res: any, next: NextFunction) {
    axios.get(URL)
        .then((response) => {

            res.send(response.data);
        })
        .catch((error) => { next(error) })

};