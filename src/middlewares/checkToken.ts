//libs
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
    //extração do token
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(" ")[1]
    //checagem do token    
    if (!token) {
        //se o token nao existe return response 401
        return res.status(401).json({ message: "acesso negado" })
    }
    try {
        //verificação se o token for valido
        const secret = process.env.SECRET
        if (secret) {
            jwt.verify(token, secret)
            next()
        }
    } catch (err) {
        //se ocorrer erro
        console.log(err)
        return res.status(401).json({ message: `erro de acesso tente mais tarde` })
    }
};