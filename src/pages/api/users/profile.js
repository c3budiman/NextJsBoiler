import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull } from '../../../utils/helpers'

export default async function userProfile(req, res) {
    let body = req.body

    var sql = `select id, username, role, bio, images from users where username=?`;

    try {
        var param = [
            rejectNull(body.username, 'username', res),
        ]

        var users = await mysqlQuery(sql, param)
        if (users.code == 0) {
            let session = {
                id: users.data[0].id,
                username: users.data[0].username,
                role: users.data[0].role,
                bio: users.data[0].bio,
                images: users.data[0].images
            }

            return res.status(200).json(session)
        } else {
            return res.status(200).json(users)
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            code: 500,
            info: "failed to get data",
            error: error
        })
    }



}