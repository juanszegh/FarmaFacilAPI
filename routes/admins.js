import MD5 from "crypto-js/md5.js"
import * as funcoesBanco from "../models.js";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const router = express.Router()  

export function verificarJWT(req, res, next){
    const token = req.headers['auth'];
    if (!token) return res.status(401).json({ auth: false, message: 'Token indisponível.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar a token.' });      
      req.userId = decoded.id;
      next();
    });
}

router.post('/logar/:login/:senha',async(req, res, next)=> {
    try
    {
        const adm = await funcoesBanco.Admin.findOne({where: {nm_login: req.params.login, nm_senha: MD5(req.params.senha).toString()}})
        if (adm)
        {
            const id = adm.cd_admin; 
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300 
            });
            return res.json({ auth: true, token: token })
        }
        res.status(500).send("Login inválido!")
    }
    catch(erro)
    {
        res.status(400).send(erro.toString())
    }
    
});