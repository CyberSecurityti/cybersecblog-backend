//libs
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//rotas
import posts from './routes/postsnav'
import adm from './routes/adm'
import { limiter } from './util/limiter'
//configurações
const PORT = process.env.PORT || 8080
const app = express()


dotenv.config()
//header & configuração do CORS
app.use((req, res, next) => {
    //alterar Acess control para o dominio do blog quando estiver pronto!
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Headers', 'Origin,X-Requrested-With ,Content-Type, Accept,Autorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET')
        return res.status(200).send({});
    }
    next();
})
//view engine 
app.set(`view engine`,`ejs`)
//limiter
app.use(limiter)
//json 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


//posts webscraping
app.use('/posts', posts)

//adm controle de usuários e posts autorais
app.use('/adm', adm)

app.get(`/`,(req,res)=>{
    res.render(`index.ejs`)
})
app.use((req,res)=>{
    res.status(404).send('Not found')
})


app.listen(PORT, () => { console.log(`server on in port ${PORT}`) })

