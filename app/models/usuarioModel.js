const pool = require("../../config/pool_conexoes");

const usuarioModel = {

    //CRUD -> Create retrieve update delete

    findAll: async()=>{
        try{
            const [resultado, estrutura] = await pool.query("select * from usuario where status_usuario = 1");
            return resultado;
        }catch(erro){
            console.log(erro);     
            return null;       
        }
    },

    create: async(valoresCampos)=>{
        try{
            const [resultado] = await pool.query("insert into usuario set ?", [valoresCampos]);
            return resultado;
        }catch(erro){
            console.log(erro);
            return null;
        }
    },    
    update: async(valoresCampos, id)=>{
        try{
            const [resultado] = await pool.query("update usuario set ? where id_usuario = ?", [valoresCampos, id]);
            return resultado;
        }catch(erro){
            console.log(erro);
            return null;
        }    
    },
    delete: async (id)=>{ // delete físico -> exclui do banco de dados
        try{
           const [resultado] = await pool.query("delete from usuario where id_usuario = ?", [id]);
           return resultado;     
        }catch(erro){
            console.log(erro);
            return null;
        }
    },
    deleteLogico: async (id)=>{ // delete lógico -> torna o registro inativo
        try{
            const [resultado] = await pool.query("upadate usuario set status_usuario = 0  where id_usuario = ?", [id]);
            return resultado;
        }catch(erro){
            console.log(erro);
            return null;
        }
    }
};


module.exports = {usuarioModel}




