// import axios from 'axios'
import { withSentry } from '@sentry/nextjs';
import { rejectNull, setSession } from '../../utils/server/helpers2'

async function handler(req, res) {
    try {
        rejectNull(req.body.email);
        rejectNull(req.body.password);
        // fetch klo api sudah ready disini...
        if (req.body.email == "admin@gmail.com" && req.body.password == "admin") {
            // set session :
            let session_result = await setSession(req, res, JSON.stringify({
                email: req.body.email
            }), process.env.APPNAME)

            if (session_result?.code == 0) {
                return res.status(200).json({
                    code: 0,
                    info: 'Login Suceed',
                    data: {
                        email: req.body.email
                    },
                    token: session_result
                })
            } else {
                return res.status(400).json(session_result)
            }
        } else {
            return res.status(400).json({
                code: 2,
                info: 'Login gagal, email atau password salah',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(
            error
        )
    }
}

export default withSentry(handler);