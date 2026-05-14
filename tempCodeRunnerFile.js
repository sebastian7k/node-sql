app.post('/clientes', async (req, res)=>{
    const { nome, email, telefone} = req.body ;
    try{
        const novoCliente = await Cliente.create({nome, email, telefone});
        res.status(201).json(novoCliente);
    } cath (error){
        res.status(500).json({error: 'Erro ao criar cliente'});
    }
}
    
)