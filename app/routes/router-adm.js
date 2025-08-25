const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");

const {usuarioModel} = require("../models/usuarioModel");

router.get("/", (req, res)=>{
    res.render("pages/index-adm");
});

router.get("/adm-cliente", async (req, res)=>{

    const listaClientes = await usuarioModel.findAll(); 

    res.render("pages/adm-cliente", {lista:listaClientes});
});


router.get("/adm-cliente-novo", (req, res)=>{
    res.render("pages/adm-cliente-novo");
})


router.post("/adm-cliente-novo", 
    
    body("nome").isLength({min:5, max:45})
        .withMessage("O nome deve ter de 5 a 45 letras!"),
    body("cep").isLength({min:8, max:8})
        .withMessage("CEP possui 8 números"),
    body("cep").isNumeric()
        .withMessage("Somente números"),
    body("nomeUsuario").isLength({min:14, max:45})
            .withMessage("O nome deve ter de 14 a 45 letras!"),
    body("email").isEmail()
        .withMessage("O e-mail deve ser válido!"),
    body("senha").isStrongPassword()
        .withMessage("Senha deve ter no mínimo 8 caracteres. Ao menos 1 maiúsculo, 1 minísculo, 1 caractere especial e 1 número!"),
    body("tipo").isInt({min:1, max:2})
        .withMessage("Valores válidos 1 ou 2!"),
    body("status").isInt({min:0, max:1})
        .withMessage("Valores válidos 1 ou 2!"),

    async (req, res)=>{

        const listaErros = validationResult(req);

        if(listaErros.isEmpty()){
            //vazio -> validação concluida com sucesso
            console.log("Sem erros de formulário");

            let usuario = {
                "nome_usuario": req.body.nome,
                "user_usuario": req.body.nomeUsuario,
                "senha_usuario": req.body.senha,
                "email_usuario": req.body.email,
                "cep_usuario": req.body.cep,
                "tipo_usuario": req.body.tipo,
                "status_usuario":req.body.status,
            };

            const resultado = await usuarioModel.create(usuario);
            //insert no banco

            if( resultado == null){
                //erro no insert
                console.log("erro insert");
            }else{
                //sucesso no insert
                res.redirect("/adm/adm-cliente");
            }

        }else{
            // tem conteúdo -> erro nos dados enviados
            console.log(listaErros);
            //enviar msg feedback erros
        }


});



module.exports = router;