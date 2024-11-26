const { pool } = require("../../bin/connection")

exports.index  = async (req, res) => {
    const userId = req.params.id
    let {name, email, phone} = req.body

    if (!userId) {
        return res.status(400).send({error: "O parametro de ID do usuário deve ser fornecido na url"})
    }

    if(!name && !email && !phone) {
        return res.status(400).send({error: "Pelomenos um dos campos (name, email, phone) deve ser preenchido."})
    }

    try {
        let updateQuery = "UPDATE users SET ";
        const fields = [];
        const values = [];

        if(name) {
            fields.push("name = $" + (fields.length + 1))
            values.push(name)
        }

        if(email) {
            fields.push("email = $" + (fields.length + 1))
            values.push(email)
        }

        if(phone) {
            fields.push("phone = $" + (fields.length + 1))
            values.push(phone)
        }

        updateQuery += fields.join(", ") + " WHERE auth_id = $" + (values.length + 1) + " RETURNING *"
        values.push(userId)

        console.log(updateQuery)
        const users = await pool.query(updateQuery, values)

        if(users.rows.length == 0) {
            return res.status(400).send({error: "usuário não encontrado"})
        }

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: users.rows
        })

    } catch (error) {

        console.error("erro para atualizar o usuário: ", error)
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }

}