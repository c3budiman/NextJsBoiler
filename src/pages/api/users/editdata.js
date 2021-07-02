import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull, getSessionFromHeader } from '../../../utils/helpers'

export default async function createUserHandler(req, res) {
    let body = req.body
    var sql = `Update users set role=?, bio=? where id =?`;

    try {
        let sessionUser = await getSessionFromHeader(req);
        if (sessionUser.code == 0) {
            var param = [
                rejectNull(body.role, 'ID Role', res),
                rejectNull(body.bio, 'Bio', res),
                rejectNull(sessionUser.data?.id, 'ID Users', res)
            ]

            var update = await mysqlQuery(sql, param)
            if (update.code == 0) {
                return res.status(200).json({ code: 0, info: 'Users Updated', data: update })
            } else {
                return res.status(200).json(update)
            }
        }
        else {
            return res.status(200).json({
                code: sessionUser.code,
                info: sessionUser.info,
            })
        }

    } catch (error) {
        console.log(error)
    }



}