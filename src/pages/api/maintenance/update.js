import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'
import { rejectNull, getSessionFromHeader } from '../../../utils/helpers'
import checkSession from "../../../middleware/checkSession"


async function handler(req, res) {
    try {
        let sessionUser = await getSessionFromHeader(req);
        rejectNull(sessionUser.data?.id, 'id', res);

        var sql = `Update maintenance set android_version=?, ios_version=?, is_maintenance=? where id=1`;
        var param = [
            rejectNull(req.body.android_version, 'android_version', res),
            rejectNull(req.body.ios_version, 'ios_version', res),
            rejectNull(req.body.is_maintenance, 'is_maintenance', res),
        ]

        var update = await mysqlQuery(sql, param)
        if (update.code == 0) {
            return res.status(200).json({
                code: 0,
                info: 'maintenance updated',
                data: update,
            })
        } else {
            return res.status(200).json(update)
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            code: 2,
            info: 'unsukses log',
        })
    }
}

export default checkSession(handler);