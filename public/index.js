const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'Piloto'
});

connection.connect(function (err) {
    if (err) {
        console.error('Erro: ', err);
        return;
    }
    console.log("Conexão estabelecida com sucesso!");
});

app.get("/", function (req, res) {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="main-login">
            <div class="left-login">
                <h1>Faça Login<br>E entre para o nosso time!</h1>
                <img src="/images/tempo.svg" class="left-login-image" alt="relogio">
            </div>
            <div class="right-login">
                <div class="card-login">
                    <h1>LOGIN</h1>
                    <form method="post" action="/login">
                        <div class="textfield">
                            <label for="usuario">Usuário</label>
                            <input type="text" name="usuario" placeholder="Usuário" required>
                        </div>
                        <div class="textfield">
                            <label for="senha">Senha</label>
                            <input type="password" name="senha" placeholder="Senha" required>
                        </div>
                        <a href="#" class="forgot">Esqueceu a senha?</a>
                        <button type="submit" class="btn-login">Logar</button>
                    </form>
                    <div class="login-register">
                        <p>Não tem uma conta?<a href="/registro.html" class="register-link"> Crie uma</a></p>
                    </div>
                </div>
            </div>
        </div>
        <script src="index.js"></script>
    </body>
    </html>
    `);
});

app.get("/registro.html", function (req, res) {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registro</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="main-register">
            <h1>Registrar-se</h1>
            <form method="post" action="/registrar">
                <div class="textfield">
                    <label for="usuario">Usuário</label>
                    <input type="text" name="usuario" placeholder="Usuário" required>
                </div>
                <div class="textfield">
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="textfield">
                    <label for="senha">Senha</label>
                    <input type="password" name="senha" placeholder="Senha" required>
                </div>
                <button type="submit" class="btn-register">Registrar</button>
            </form>
        </div>
    </body>
    </html>
    `);
});

app.post('/registrar', async (req, res) => {
    try {
        const { id, usuario, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);

        const values = [id, usuario, email, hashedPassword];
        const insert = "INSERT INTO usuario(id, usuario, email, senha) VALUES (?,?,?,?)";

        connection.query(insert, values, function (err, result) {
            if (!err) {
                console.log("Dados inseridos com sucesso!");
                res.send(`
                    <script>
                        alert('Conta criada com sucesso!');
                        window.location.href = '/';
                    </script>
                `);
            } else {
                console.log("Não foi possível inserir os dados: ", err);
                res.send("Erro!");
            }
        });
    } catch (error) {
        console.log("Erro ao registrar usuário: ", error);
        res.status(500).send("Erro ao registrar usuário");
    }
});

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    const query = "SELECT * FROM usuario WHERE usuario = ?";
    connection.query(query, [usuario], async (err, results) => {
        if (err) {
            console.log("Erro ao buscar usuário: ", err);
            return res.status(500).send("Erro no servidor");
        }

        if (results.length === 0) {
            return res.send(`
                <script>
                    alert('Usuário não encontrado!');
                    window.location.href = '/';
                </script>
            `);
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (passwordMatch) {
            // Redirecionamento direto usando res.redirect
            res.redirect('/todolist.html');
        } else {
            return res.send(`
                <script>
                    alert('Senha incorreta!');
                    window.location.href = '/';
                </script>
            `);
        }
    });
});



app.post('/atualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario, email, senha } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);

        const updateQuery = "UPDATE usuario SET usuario = ?, email = ?, senha = ? WHERE id = ?";

        connection.query(updateQuery, [usuario, email, hashedPassword, id], function (err, result) {
            if (!err) {
                console.log("Dados atualizados!");
                res.redirect('/');
            } else {
                console.log("Erro ao atualizar dados: ", err);
                res.status(500).send("Erro ao atualizar dados");
            }
        });
    } catch (error) {
        console.log("Erro ao atualizar usuário: ", error);
        res.status(500).send("Erro ao atualizar usuário");
    }
});

app.listen(8081, function () {
    console.log("Servidor rodando na url http://localhost:8081");
});
