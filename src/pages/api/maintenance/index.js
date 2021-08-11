import { mysqlQuery } from '../../../drivers/mysql/mysqlQuery'


async function handler(req, res) {
    try {
        var sql = `select * from maintenance where id = 1`;
        var result = await mysqlQuery(sql);
        if (result.code == 0) {
            return res.status(200).json(
                {
                    code: 0,
                    info: 'berhasil ambil data',
                    data: result.data[0]
                }
            )
        } else {
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            code: 2,
            info: 'unsukses log',
        })
    }
}

export default handler;