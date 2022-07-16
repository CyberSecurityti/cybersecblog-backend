import express from 'express'
import checkToken from '../middlewares/checkToken'
import requestScrap from '../middlewares/requestScrap'
const noticia=express()

noticia.get('/noticias',checkToken,requestScrap)

export default noticia
