import express from 'express'
import { Ipost } from '../interfaces/Ipost'
import { Iuser } from '../interfaces/Iuser'
import mongoose from '../models/db'
import postSchema from '../models/posts'
import userSchema from '../models/users'
import crypt from '../util/crypt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkToken from '../middlewares/checkToken'
const adm = express()

//posts

//READ
adm.get('/posts', checkToken, async (req, res) => {
    const posts = mongoose.model('posts', postSchema, 'posts')

    try {
        let data = await posts.find({})
        res.json(data)
    } catch (err) {
        res.sendStatus(400)
    }
})
adm.get('/post/:id', checkToken, async (req, res) => {
    const posts = mongoose.model('posts', postSchema, 'posts')

    try {
        let data = await posts.findById(req.params.id)
        data != null ? res.json(data) : res.json({ message: 'post foi excluido' })

    } catch (err) {
        res.sendStatus(400)
    }
})


//CREATE
adm.post(`/post/create`, checkToken, async (req, res) => {

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
//DELETE
adm.delete('/post/delete/', checkToken, async (req, res) => {

    const posts = mongoose.model('posts', postSchema, 'posts')
    try {
        let data = await posts.findById(req.body.id)
        if (data != null) {
            await posts.deleteOne({ _id: req.body.id })
            res.json({ msg: `deleted` })
        } else {
            res.json({ message: 'post já foi excluido' })
        }

    } catch (e) {
        res.sendStatus(400)
    }
})
//UPDATE
adm.put('/post/update/', checkToken, async (req, res) => {
    const updatePost: Ipost = {
        titulo: req.body.titulo,
        noticia: req.body.noticia,
        imagem: req.body.imagem,
        data: new Date(req.body.data),
        fonte: req.body.fonte,
    }
    const posts = mongoose.model('posts', postSchema, 'posts')
    try {
        let data = await posts.findById(req.body.id)
        if (data != null) {
            await posts.updateOne({ _id: req.body.id }, updatePost)

            res.json({ msg: `${data.titulo} atualizado` })
        } else {
            res.json({ message: 'post foi excluido' })
        }

    } catch (e) {
        res.sendStatus(400)
    }
})

//users
adm.get('/users', checkToken, async (req, res) => {
    const users = mongoose.model('users', userSchema, 'users')
    const allUser = await users.find({})
    res.status(200).json(allUser)
})
adm.post('/user/create', checkToken, async (req, res) => {

    const { nome, email, senha, senhaconfirm, classe } = req.body
    const users = mongoose.model('users', userSchema, 'users')
    const userexist = await users.find({ nome: nome })
    const mailexist = await users.find({ email: email })

    //tratamento da request
    if (!nome || !senha || !email || !senhaconfirm) {
        return res.status(422).json({ message: "preencha todos os valores" })
    }
    if (senhaconfirm != senha) {
        return res.status(422).json({ message: "senhas não são iguais" })
    }
    if (userexist.length > 0) {
        return res.status(422).json({ message: 'usuario já existe' })
    }
    if (mailexist.length > 0) {
        return res.status(422).json({ message: 'email já cadastrado' })
    }

    const senhahash = await crypt(senha)
    const insertUser: Iuser = {

        nome: nome,
        email: email,
        senha: senhahash,
        classe: classe
    }
    const user = new users(insertUser)
    try {
        await user.save()
        res.json({ message: `user ${req.body.nome} criado` })
    } catch (err) {
        res.status(501).json({ message: 'erro interno, tente novamente mais tarde' })
    }



})
adm.delete('/user/delete', checkToken, async (req, res) => {
    const { id } = req.body
    const users = mongoose.model('users', userSchema, 'users')
    const user = await users.findById(id)
    if (!user) {
        return res.status(404).json({ message: 'user não encontrado' })
    }
    await users.deleteOne({ _id: id })
    res.status(200).json({ message: `usuário ${user.nome} deletado` })

})

adm.post('/user/login', async (req, res) => {
    const { email, senha } = req.body
    if (!senha || !email) {
        return res.status(422).json({ message: "preencha todos os valores" })
    }
    const users = mongoose.model('users', userSchema, 'users')
    const user = await users.findOne({ email: email })
    if (!user || !user.senha) {
        return res.status(404).json({ message: "usuário não encontrado" })

    }

    const checkpassword = bcrypt.compare(senha, user.senha)
    if (!checkpassword) {
        return res.status(422).json({ message: 'senha incorreta' })
    }
    try {
        const secret = process.env.SECRET
        if (secret) {
            const token = jwt.sign({
                id: user._id, name: user.nome
            }, secret)

            res.status(200).json({ message: "logado com sucesso", token })
        }
    } catch (err) {
        res.status(501).json({ message: "erro interno" })
    }
})

export default adm
