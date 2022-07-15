import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(" ")[1]
        
    if (!token) {
        return res.status(401).json({ message: "acesso negado" })
    }
    try {
        const secret = process.env.SECRET
        if (secret) {
            jwt.verify(token, secret)
            next()
        }
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};