const path = require('path')
const PropriedadesDAO = require('../../DAO/propriedadeDAO')
const CompostosDAO = require('../../DAO/compostosDAO')

const compostosDAO = new CompostosDAO();
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
        res.status(403).send('Acesso negado');
    }
}
module.exports= (app) =>{
    app.get("/propriedades", async (req, res) => {
        
        const propriedadesDAO = new PropriedadesDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await propriedadesDAO.consultarPropriedade())

    })
  
    app.get("/propriedade",checkAdmin,verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        lista_composto= await compostosDAO.consultarComposto();
        res.render('propriedades/propriedade',{compostos:lista_composto})
    })
    app.get("/propriedade/lista",checkAdmin,verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const propriedadeDAO= new PropriedadesDAO();
        lista_propriedades= await propriedadeDAO.consultarPropriedade();
        res.render('propriedades/lista',{propriedades:lista_propriedades})
    })
    app.post("/registrarpropriedades",(req,res) =>{
        const propriedadesDAO = new PropriedadesDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtcomposto,txtnome, txtvalor} = req.body;

        propriedadesDAO.registrarPropriedade(txtcomposto, txtnome,txtvalor)
        
        res.redirect('/propriedade/lista');
    })
    app.delete("/propriedade/apagar/:id", async (req,res) =>{
        const propriedadesDAO = new PropriedadesDAO()  ;
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await propriedadesDAO.apagarPropriedade(req.params.id))

    })
    app.get("/propriedade/alterar/:id",checkAdmin,verificarAutenticacao, async (req, res) => {
        const propriedadesDAO = new PropriedadesDAO() 
        lista_composto= await compostosDAO.consultarComposto();
        const dtuso = await propriedadesDAO.consultarPropriedadeId(req.params.id)

        res.render("propriedades/uppropriedade", { propriedade: dtuso ,compostos:lista_composto})
    })
    app.put("/propriedade/alterar", async (req, res) => {
        const propriedadesDAO = new PropriedadesDAO() ;
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {composto, nome,valor,id } = req.body

        const r = await propriedadesDAO.atualizarPropriedade(composto,nome,valor,id)

        res.redirect('/propriedade/lista');

    })
}