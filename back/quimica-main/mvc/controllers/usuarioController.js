const path = require('path')
const UsuariosDAO = require('../../DAO/usuarioDAO')

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
    app.get("/usuarios", async (req, res) => {
        
        const usuariosDAO = new UsuariosDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await usuariosDAO.consultarUsuario())

    })
    
    app.get("/usuario",verificarAutenticacao,checkAdmin, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/usuarios/usuarios.html"))
    })
    app.post("/registrarusuarios",(req,res) =>{
        const usuariosDAO = new UsuariosDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnome,txtemail,txtsenha,txttipo} = req.body;

        usuariosDAO.registrarUsuario(txtnome,txtemail,txtsenha,txttipo)
        
        res.redirect('/usuario/lista');
    })
    app.get("/usuario/lista",verificarAutenticacao,checkAdmin, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const usuariosDAO= new UsuariosDAO();
        lista_usuarios= await usuariosDAO.consultarUsuario();
        res.render('usuarios/lista',{usuarios:lista_usuarios})
    })
    app.delete("/usuario/apagar/:id", async (req,res) =>{
        const usuariosDAO = new UsuariosDAO()  ;
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await usuariosDAO.apagarUsuario(req.params.id))

    })
    app.get("/usuario/alterar/:id",verificarAutenticacao,checkAdmin, async (req, res) => {
        const usuariosDAO = new UsuariosDAO() 
        const dtusuario = await usuariosDAO.consultarUsuarioId(req.params.id)

        res.render("usuarios/upusuario", { usuario: dtusuario})
    })
    app.put("/usuario/alterar", async (req, res) => {
        const usuariosDAO = new UsuariosDAO() ;
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, email,senha,tipo,id } = req.body

        const r = await usuariosDAO.atualizaUsuario(nome, email,senha,tipo,id )

        res.redirect('/usuario/lista');

    })
}