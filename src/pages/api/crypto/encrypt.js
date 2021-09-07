import { rejectNull, encryptBro } from '../../../utils/helpers'

async function handler(req, res) {
    let body = req.body
    try {
        let token = rejectNull(body.token, 'token', res);
        let password = rejectNull(body.password, 'password', res);

        if (password == '123456') {
            let salt = process.env.APPKEY;
            let encrypted = await encryptBro(salt, token);

            return res.status(200).json({
                code: 0,
                info: 'sukses',
                encrypted: encrypted,
            })
        } else {
            return res.status(401).json({
                code: 1,
                info: 'password salah',
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            code: 2,
            info: 'unsukses encrypt',
        })
    }
}

export default handler;