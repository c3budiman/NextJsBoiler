import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull, getSessionFromHeader } from '../../../utils/helpers'
import checkSession from "../../../middleware/checkSession"
import withRoles from "../../../middleware/withRoles"
import { setSession } from "../../../drivers/redis/session"

async function editData(req, res) {
    let body = req.body
    var sql = `Update users set role=?, bio=? where id =?`;

    try {
        let sessionUser = await getSessionFromHeader(req);
        var param = [
            rejectNull(body.role, 'ID Role', res),
            rejectNull(body.bio, 'Bio', res),
            rejectNull(sessionUser.data?.id, 'ID Users', res)
        ]

        var update = await mysqlQuery(sql, param)
        if (update.code == 0) {
            sessionUser.data.role = body.role;
            sessionUser.data.bio = body.bio;

            var asd = await setSession(req, res, JSON.stringify(sessionUser.data), process.env.APPNAME, false)

            return res.status(200).json({ code: 0, info: 'Users Updated', data: update, token: asd })
        } else {
            return res.status(200).json(update)
        }
    } catch (error) {
        console.log(error)
    }
}

export default checkSession(withRoles(editData, [1,2]));