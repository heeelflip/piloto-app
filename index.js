const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'Piloto'
});

connection.connect(function(err){
    if(err){
        console.error('Erro: ',err)
        return
    }
    console.log("Conexão estabelecida com sucesso!")
});


app.get("/", function(req, res){
    res.send(`
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" href="public/style.css">
        </head>
        <body>
            <div class="main-login">
                <div class="left-login">
                    <h1>Faça Login<br>E entre para o nosso time!</h1>
                    <img src="public/images/tempo.svg" class="left-login-image" alt="relogio">
                </div>
                <div class="right-login">
                    <div class="card-login">
                        <h1>LOGIN</h1>
                        <div class="textfield">
                            <label for="usuario">Usuário</label>
                            <input type="text" name="usuario" placeholder="Usuário">
                        </div>
                        <div class="textfield">
                            <label for="senha">Senha</label>
                            <input type="password" name="senha" placeholder="Senha">
                        </div>                
                        <a href="#" class="forgot">Esqueceu a senha?</a>
                        <button class="btn-login"><a href="tarefas.html">Logar</a></button>
                        
                        <div class="login-register">
                            <p>Não tem uma conta?<a href="registro.html" class="register-link"> Crie uma</a></p>
                        </div>
                    </div>
                </div>
            </div>
        
            <script src="index.js"></script>
        </body>
        </html>
    `)
});

app.post('/registar', (req, res) =>{
        
     const id = req.body.id;
     const usuario = req.body.usuario;
     const email = req.body.email;
     const senha = req.body.senha
     
 
     const values = [ id, usuario, email, senha,]
     const insert = "INSERT INTO usuario(id, usuario, email, senha) VALUES (?,?,?,?)";
 
     connection.query(insert, values, function(err, result){
         if (!err){
         
             console.log("Dados inseridos com sucesso!");
             res.redirect('/');
             
         } else {
             console.log("Não foi possível inserir os dados: ", err);
             res.send("Erro!")
         }
     });
 });

 app.post('/atualizar/:id', (req, res) => {

   const id = req.params.id;
   const usuario = req.body.usuario;
   const email = req.body.email;
   const senha = req.body.senha
   
   

    const updateQuery = "UPDATE usuario SET usuario = ?, email = ?, senha = ? WHERE id = ?"

    connection.query(updateQuery, [usuario, email, senha, id], function(err, result){
        if (!err){

            console.log("Dados atualizados!");
            res.redirect('/');

        } else {
            console.log("Erro ao atualizar dados: ", err);
            res.status(500).send("Erro ao atualizar dados");
        }
    });
});

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
})

