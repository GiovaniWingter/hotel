const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const {usuarioModel} = require("../models/usuarioModel");



router.get("/select", async(req, res)=>{

    let usuarios =  usuarioModel.findAll();

    console.log(usuarios);

} );

router.get("/insert", async(req, res)=>{
        try{
            let dadosUsuario = {
                nome_usuario: "Joca Silva",
                user_usuario: "joca",
                senha_usuario: "123456@Teste",
                email_usuario: "joca@gmail.com"
            };            
            const [resultado] = await pool.query("insert into usuario set ?", [dadosUsuario]);            
            console.log(resultado);    
        }catch(erro){
            console.log(erro);
        }
});

router.get("/", (req, res) => {
    res.render('pages/index');
})

router.get("/login", (req, res) => {
    res.render("pages/login", { status: null, listaErros: null, nomeusuario:""});
})

router.get("/cadastro", (req, res) => {
    res.render("pages/cadastro");
})

router.get("/perfil", (req, res) => {
    res.render("pages/perfil")
})

router.post("/login",

    body("nome")
        .isLength({ min: 5, max: 45 })
        .withMessage("Nome deve ter de 5 a 45 letras!")
        .isAlpha()
        .withMessage("Nome deve ter apenas letras!"),
    body("senha")
        .isLength({ min: 8, max: 14 })
        .withMessage("A senha deve ter no mínimo 8 caracteres e máximo 14!"),

    (req, res) => {

        const listaErros = validationResult(req);

        if (listaErros.isEmpty()) {
            //não temos erros
            let nome = req.body.nome;
            let senha = req.body.senha;

            console.log(`nome: ${nome}`);
            console.log(`senha: ${senha}`);

            if (nome == "Teste" && senha == "12345678") {
                res.render("pages/perfil");
            } else {
                res.render("pages/login", { status: "falha-login",
                    listaErros: null, nomeusuario:nome});
            }
        } else {
            //tem erros
            console.log(listaErros);
            res.render("pages/login", { status: null,
                    listaErros: listaErros, nomeusuario:req.body.nome});

        }


    })

router.post("/cadastro", (req, res) => {

})

router.post("/perfil", (req, res) => {

})


module.exports = router;