import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull, getSessionFromHeader } from '../../../utils/helpers'
import checkSession from "../../../middleware/checkSession"


async function userProfile(req, res) {
    var sql = `select users.id as userid, username, role, roles.name as rolename, bio, images 
                from users join roles on users.role=roles.id where users.id=?`;
    try {
        let sessionUser = await getSessionFromHeader(req);
        // if (sessionUser.code == 0) {
        var param = [
            rejectNull(sessionUser.data?.id, 'id', res),
        ]
        var users = await mysqlQuery(sql, param)

        if (users.code == 0) {
            let session = {
                id: users.data[0].userid,
                username: users.data[0].username,
                role: users.data[0].role,
                rolename: users.data[0].rolename,
                bio: users.data[0].bio,
                images: users.data[0].images
            }

            
            return res.status(200).json(
                {
                    code: 0,
                    info: 'berhasil ambil data',
                    data: session
                }
            )
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

export default checkSession(userProfile);