import * as funcoesBanco from "../models.js";
import express from "express";
import {trazerDados} from "../crawl.js";

export const router = express.Router()
const farmacias = await funcoesBanco.carregarFarmacias()

router.get('/:ordem/:farmacia/:nome/:limite',async(req, res, next)=> {
    try
    {
        let farmacias_atuais = farmacias
        if (req.params.farmacia !== "todas")
        {
            const nomes_farmacias = req.params.farmacia.split('+')
            farmacias_atuais = farmacias.filter(f => nomes_farmacias.includes(f.nm_farmacia.replace(/\s/g,'').toLowerCase()))
        }
        res.status(200).send(await trazerDados(req.params.nome,req.params.limite,farmacias_atuais,req.params.ordem))
    }
    catch(erro)
    {
        res.status(400).send(erro)
    }
    
});