// import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { getSessionFromHeader } from '../../../utils/helpers'
import checkSession from "../../../middleware/checkSession"


async function gettSessions(req, res) {
    try {
        let sessionUser = await getSessionFromHeader(req);
        if (sessionUser.code == 0) {
            return res.status(200).json(
                {
                    code: 0,
                    info: 'berhasil ambil data',
                    data: sessionUser?.data
                }
            )
        } else {
            return res.status(401).json(sessionUser)
        }
    } catch (error) {
        return res.status(401).json({
            code: 500,
            info: "not logged in",
            error: error
        })
    }
}

export default checkSession(gettSessions);