import express from 'express'
import { Ipost } from '../interfaces/Ipost'
import mongoose from '../models/db'
import postSchema from '../models/posts'

const adm = express()

adm.post(`/create`, async (req, res) => {
    
    const insertPost: Ipost = {
        titulo: req.body.titulo,
        noticia: req.body.noticia,
        imagem: req.body.imagem,
        data: new Date(req.body.data),
        fonte: req.body.fonte,
    }
    const posts = mongoose.model('posts', postSchema, 'posts')
    const post = new posts(insertPost)
    try {
        await post.save()
        res.json({ message: "inserted" })
    } catch (err) {
        res.send(err)
    }
})





export default adm
