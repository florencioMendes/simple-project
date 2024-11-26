const { pool } = require("../../bin/connection")

exports.index  = async (req, res) => {
    const {name, email, phone, auth_id} = req.body

    if(!name || !email || !phone || !auth_id) {
        return res.status(400).send({error: "Todos os parâmetros (name, email, phone, auth_id) devem ser preenchidos."})
    }

    try {
        const users = await pool.query(
            "INSERT INTO users (name, email, phone, auth_id) VALUES ($1, $2, $3, $4) RETURNING *"
        , [name, email, phone, auth_id])

        res.status(200).json({
            message: "Usuário Cadastrado com sucesso!",
            user: users.rows
        })

    } catch (error) {

        if(error.code == 23505) {
            return res.status(409).json({
                error: "Usuário já possui cadastro!"
            })
        }

        console.error('Erro ao cadastrar usuário: ', error)
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
}