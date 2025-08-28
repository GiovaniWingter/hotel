const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");


const { usuarioController} = require("../controllers/usuarioController");

router.get("/", (req, res) => {
    res.render("pages/index-adm");
});

router.get("/adm-cliente",  (req, res) => {
    usuarioController.listarUsuario(req, res);
});


router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo");
})


router.post("/adm-cliente-novo", 
    usuarioController.regraValidacaoCadUsuario,
     (req, res) => {
        usuarioController.addUsuario(req, res);

    }
);



module.exports = router;