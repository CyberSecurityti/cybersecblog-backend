import express from 'express'
import requestScrap from '../middlewares/requestScrap'
const noticia=express()

noticia.get('/scraping',requestScrap)





export default noticia
