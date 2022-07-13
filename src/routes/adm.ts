import express from 'express'
import { Ipost } from '../interfaces/Ipost'
import mongoose from '../models/db'
import postSchema from '../models/posts'

const adm = express()

//ler dados
adm.get('/posts', async (req, res) => {
    const posts = mongoose.model('posts', postSchema, 'posts')

    try {
        let data = await posts.find({})
        res.json(data)
    } catch (err) {
        res.sendStatus(400)
    }
})
adm.get('/post/:id', async (req, res) => {
    const posts = mongoose.model('posts', postSchema, 'posts')

    try {
        let data = await posts.findById(req.params.id)
        data != null ? res.json(data) : res.json({ message: 'post foi excluido' })

    } catch (err) {
        res.sendStatus(400)
    }
})

//alterar e criar dados

adm.post(`/post/create`, async (req, res) => {

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
        res.json({ message: `post ${req.body.titulo} criado` })
    } catch (err) {
        res.sendStatus(400)
    }
})

adm.get('/post/delete/:id', async (req, res) => {

    const posts = mongoose.model('posts', postSchema, 'posts')
    try {
        let data = await posts.findById(req.params.id)
        if (data != null) {
            await posts.deleteOne({ _id: req.params.id })
            res.json({ msg: `deleted` })
        } else {
            res.json({ message: 'post já foi excluido' })
        }

    } catch (e) {
        res.sendStatus(400)
    }
})
adm.get('/post/edit/:id', async (req, res) => {
    const updatePost: Ipost = {
        titulo: req.body.titulo,
        noticia: req.body.noticia,
        imagem: req.body.imagem,
        data: new Date(req.body.data),
        fonte: req.body.fonte,
    }
    const posts = mongoose.model('posts', postSchema, 'posts')
    try {
        let data = await posts.findById(req.params.id)
        if (data != null) {
            await posts.updateOne({ _id: req.params.id }, updatePost)

            res.json({ msg: `${data.titulo} atualizado` })
        } else {
            res.json({ message: 'post foi excluido' })
        }

    } catch (e) {
        res.sendStatus(400)
    }
})


export default adm
