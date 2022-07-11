//libs
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
//configurações
const PORT=process.env.PORT || 8080
const app = express()


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
//session e validade
app.use(session({secret:`asklfadfjskdfjsdfklsdjfklsdjnlcvxviibidff`,cookie:{maxAge:70000}}))
//json 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


app.get(`/`,(req,res)=>{

  
    res.status(200).send(`yes`)
})

app.use((req,res,next)=>{
    res.sendStatus(404)
   
})


app.listen(PORT,()=>{console.log(`server on in port ${PORT}`)})

