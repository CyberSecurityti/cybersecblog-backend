import express from 'express'
import requestScrap from '../middlewares/requestScrap'
const noticia=express()

noticia.get('/noticias',requestScrap)





export default noticia
