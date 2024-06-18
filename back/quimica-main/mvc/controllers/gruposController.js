const path = require('path')
const GruposDAO = require('../../DAO/gruposDAO')
function verificarAutenticacao(req, res, next) {
 
    if (req.session.user && req.session.user.email && req.session.user.tipo) {
 
        next();
    } else {
 
        res.redirect('/logar');
    }
}
function checkAdmin(req, res, next) {
    const tipo = req.session.user.tipo;
    
    if (tipo === 'admin') {
        next();
    } else {
        res.redirect('http://localhost:3000');
    }
}


module.exports= (app) =>{
    app.get("/grupos", async (req, res) => {
        
        const gruposDAO = new GruposDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await gruposDAO.consultarGrupos())

    })
   
    app.get("/grupo",verificarAutenticacao,checkAdmin, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/grupos/grupos.html"))
    })
    app.post("/registrargrupos",(req,res) =>{
        const gruposDAO = new GruposDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnome, txtdesc} = req.body;

        gruposDAO.registrarGrupos(txtnome, txtdesc)
        
        res.redirect('/grupo/lista');
    })
    app.get("/grupo/lista",verificarAutenticacao,checkAdmin, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const gruposDAO = new GruposDAO();
        lista_grupos= await gruposDAO.consultarGrupos();
        res.render('grupos/lista',{grupos:lista_grupos})
    })
    app.delete("/grupo/apagar/:id", async (req,res) =>{
        const gruposDAO = new GruposDAO()  ;
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await gruposDAO.apagarGrupos(req.params.id))

    })
    app.get("/grupo/alterar/:id",verificarAutenticacao,checkAdmin,async (req, res) => {
        const gruposDAO = new GruposDAO() 
        const dtgrupo = await gruposDAO.consultarGruposId(req.params.id)

        res.render("grupos/upgrupo", { grupo: dtgrupo})
    })
    app.put("/grupo/alterar", async (req, res) => {
        const gruposDAO = new GruposDAO() ;
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, descricao,id } = req.body

        const r = await gruposDAO.atualizarGrupos(nome, descricao,id )

        res.redirect('/grupo/lista');

    })
}