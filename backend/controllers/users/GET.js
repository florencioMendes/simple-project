const { pool } = require("../../bin/connection")

exports.index  = async (req, res) => {
    const userId = req.params.id;

    try {
        
        const users = await pool.query("SELECT * FROM users WHERE auth_id = $1", [userId])

        if(users.rows.length == 0) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).send({
            message: "Usuário encontrado com sucesso!", 
            user: users.rows
        })

    } catch (error) {
        
        console.error('Erro ao encontrar o usuário: ', error)
        res.status(500).json({ error: 'Erro ao encontrar o usuário' });
    }
}