import checkSession from "../../../middleware/checkSession"
import withRoles from "../../../middleware/withRoles"
// import { setSession } from "../../../drivers/redis/session"

async function editData(req, res) {
    try {
        return res.status(200).json({ code: 0, info: 'yes this user is an user with roles 2' })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export default checkSession(withRoles(editData, [2]));