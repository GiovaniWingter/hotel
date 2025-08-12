const express = require("express");
const app = express();
const porta = 3000;
const dotEnv = require("dotenv").config();


app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rotas = require("./app/routes/router");
app.use("/", rotas);
const rotasAdm = require("./app/routes/router-adm");
app.use("/adm", rotasAdm);

app.listen(porta, ()=>{
    console.log(`Servidor on-line!\nhttp://localhost:${porta}`);
})
