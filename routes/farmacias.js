import * as funcoesBanco from "../models.js";
import express from "express";
import  {verificarJWT }  from "./admins.js";

export const router = express.Router()

router.get('/carregar_farmacias/:farmacias',async(req, res, next)=> {
    try
    {
        let farmacias = await funcoesBanco.carregarFarmacias()
        if (req.params.farmacias !== "todas")
        {
            const nomes_farmacias = req.params.farmacias.split('+')
            farmacias = farmacias.filter(f => nomes_farmacias.includes(f.nm_farmacia.replace(/\s/g,'').toLowerCase()))
        }
        res.status(200).send(farmacias);
    }
    catch(erro)
    {
        res.status(400).send(erro.toString())
    }
});    

function validarAtributo(att, farmacia)
{
    return att === "#" ? farmacia.nm_farmacia : att
}

router.post('/editar_farmacia/:cd_farmacia/:nm_farmacia/:seletor_preco/:seletor_nome_produto/:seletor_link',verificarJWT,async(req, res, next)=> {
    try
    {
        const farmacia = await funcoesBanco.Farmacia.findOne({where : {cd_farmacia: Number(req.params.cd_farmacia)}})
        await farmacia.set({
            nm_farmacia: await validarAtributo(req.params.nm_farmacia, farmacia),
            url: await validarAtributo(req.body.url, farmacia),
            url_puro: await validarAtributo(req.body.url_puro, farmacia),
            seletor_preco: await validarAtributo(req.params.seletor_preco, farmacia),
            seletor_nome_produto: await validarAtributo(req.params.seletor_nome_produto, farmacia),
            seletor_link: await validarAtributo(req.params.seletor_link, farmacia)
        })
        await farmacia.save()
        res.status(200).send(`Farmacia ${farmacia.nm_farmacia} atualizada`)
    }
    catch (erro)
    {
        res.status(400).send(erro.toString())
    }
    
});

router.post('/excluir_farmacia/:cd_farmacia',verificarJWT,async(req, res, next)=> {
   try 
   {
        const nm_farmacia = (await funcoesBanco.Farmacia.findOne({where: {cd_farmacia: req.params.cd_farmacia}})).nm_farmacia
        await funcoesBanco.Farmacia.destroy({where: {cd_farmacia: req.params.cd_farmacia}}) 
        res.status(200).send(`Farmacia ${nm_farmacia} excluída.`)
   } 
   catch (erro) 
   {
        res.status(400).send(erro.toString())
   } 
});

router.post('/criar_farmacia/:nm_farmacia/:seletor_preco/:seletor_nome_produto/:seletor_link',verificarJWT,async(req, res, next)=> {
    try 
    {
        await funcoesBanco.criarFarmacia({
            nm_farmacia: req.params.nm_farmacia,
            url: req.body.url,
            url_puro: req.body.url_puro,
            seletor_preco: req.params.seletor_preco,
            seletor_nome_produto: req.params.seletor_nome_produto,
            seletor_link: req.params.seletor_link
        });
        res.status(200).send(`Farmacia ${req.params.nm_farmacia} criada com sucesso`)
    } 
    catch (erro) 
    {
        res.status(400).send(erro.toString())    
    }
});    