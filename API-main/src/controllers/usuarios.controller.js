import {pool} from '../db.js'
const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const getUsuarios = async (req, res) => {
   try {
    //throw new Error('')
    const [rows] = await pool.query('SELECT * FROM Usuarios')
   res.json(rows)
   } catch (error) {
    return res.status(500).json({
        message: 'no se ha podido mostrar los usuarios'
    })
   }
}

export const getUsuario = async(req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id])
    
    if (rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
        message: 'no se ha podido mostrar el usuario'
    })
   } 
}


export const createUsuario = async (req, res) => {
    const {name, email} = req.body
   try {
    if(name === undefined || email === undefined){
        return res.status(400).json({
            message: 'Campos faltantes en el body [name, email]'
        })
    }


    if(!pattern.test(email)){
        return res.status(400).json({
            message: 'Ingrese un email valido: example@hotmail.com'
        })
    }

    const [rows] = await pool.query('INSERT INTO Usuarios (name, email) VALUES (?, ?)', [name, email])
    res.send({
        id: rows.insertId,
        name,
        email,
    })
   } catch (error) {
    return res.status(500).json({
        message: 'no se ha podido crear un usuario'
    })
   } 
}




export const deleteUsuario = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Usuarios WHERE id = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'no se ha podido eliminar al usuario'
        }) 
    }
}


export const updateUsuario = async(req, res) => {
    const {id} = req.params
    const {name, email} = req.body

    try {
        if(!pattern.test(email)){
            return res.status(400).json({
                message: 'Ingrese un email valido: example@hotmail.com'
            })
        }

        const [result] = await pool.query('UPDATE Usuarios SET name = IFNULL(?, name), email = IFNULL(?, email) WHERE id = ?', [name, email, id])

        console.log(result)

   if (result.affectedRows === 0) return res.status(404).json({
     message: 'Usuario no encontrado'
   })

   const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id])

   res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'no se ha podido editar un usuario'
        }) 
    }
}

