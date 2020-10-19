import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull } from '../../../utils/helpers'

export default async function deleteUsersHandler(req, res) {
    let body = req.body

    var sql = `DELETE from users WHERE USERNAME = ?`;

    try {
        var param = [
            rejectNull(body.username, 'username', res)
        ]

        var insert = await mysqlQuery(sql, param)
        if (insert.code == 0) {
            return res.status(200).json({ code: 0, info: 'DELETE is done', data: insert })
        } else {
            return res.status(200).json(insert)
        }
    } catch (error) {
        console.log(error)
    }
}