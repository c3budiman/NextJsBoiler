import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull } from '../../../utils/helpers'
import { setSession } from "../../../drivers/redis/session"

//this example we integrate sign in with redis, and cookies
//well we can do a sign in with jwt too, if we want it.
async function userSignIn(req, res) {
    let body = req.body

    var sql = `select id, role, username, bio, images from users where username=? and password=?`;

    try {
        var param = [
            rejectNull(body.username, 'username', res),
            //md5 from the frontend. for security reason when posting so that nobody can prick your password from wireshark.
            rejectNull(body.password, 'password', res)
        ]

        var users = await mysqlQuery(sql, param)
        if (users.code == 0) {
            let session = {
                id: users.data[0].id,
                role: users.data[0].role,
                username: users.data[0].username,
                bio: users.data[0].bio,
                images: users.data[0].images
            }

            let session_result = await setSession(req, res, JSON.stringify(session), process.env.APPNAME, false)

            if (session_result.code == 0) {
                return res.status(200).json({ code: 0, info: 'Login Suceed', data: session, token: session_result })
            } else {
                return res.status(200).json(session_result)
            }
        } else {
            return res.status(200).json(users)
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            code: 500,
            info: "failed to login",
            error: error
        })
    }
}

export default userSignIn;
