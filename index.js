const express = require('express')
const cors = require ('cors')
const {Sequelize, DataTypes} = require ('sequelize')

//configurando conexão 

const sequelize = new Sequelize('db_api', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
} );

//definindo o model de dados 

const Cliente = sequelize.define('Cliente',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

//congigurando o servidor expresss

const app = express();
app.use(cors());
app.use(express.json());

//rotas da api pra criar um novo cliente

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar clientes'});
    }
});

// rota post para criar um novo cliente
app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        const novoCliente = await Cliente.create({ nome, email, telefone });
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar cliente'});
    }
});

const port = process.env.PORT || 3000;

// iniciando o servidor e sincronizando com o banco de dados 

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        console.log('Banco de dado sincronizado com sucesso');
    });
}).catch(error => {
    console.error('ERRO AO CONECTAR AO BANCO DE DADOS', error);
});