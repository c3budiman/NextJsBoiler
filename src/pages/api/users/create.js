import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { emptyToString, rejectNull } from '../../../utils/helpers'
import md5 from 'md5'

export default async function createUserHandler(req, res) {
    let body = req.body

    var sql = `INSERT INTO users
        (
            username,
            password,
            role,
            bio,
            images
        )
        VALUES
        (
            ?,
            ?, 
            ?, 
            ?, 
            ?
        )
    `;

    try {
        var param = [
            rejectNull(body.username, 'username', res),
            md5(rejectNull(body.password, 'password', res)),
            rejectNull(body.role, 'role', res),
            emptyToString(body.bio),
            emptyToString(body.images)
        ]

        var insert = await mysqlQuery(sql, param)
        if (insert.code == 0) {
            return res.status(200).json({ code: 0, info: 'Users Created', data: insert })
        } else {
            return res.status(200).json(insert)
        }
    } catch (error) {
        console.log(error)
    }



}