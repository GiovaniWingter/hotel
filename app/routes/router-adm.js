const express = require("express");
const router = express.Router();

const {usuarioModel} = require("../models/usuarioModel");

router.get("/", (req, res)=>{
    res.render("pages/index-adm");
});

router.get("/adm-cliente", async (req, res)=>{

    const listaClientes = await usuarioModel.findAll(); 

    res.render("pages/adm-cliente", {lista:listaClientes});
});


module.exports = router;