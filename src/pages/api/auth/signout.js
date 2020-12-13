import { delSession } from '../../../drivers/redis/session'

const buildCookies = (key, val) => {
    var now = new Date();
    var time = now.getTime();
    time += 0; // (1 hari. jadi 1000 itu menandakan perkalian dengan detik)
    now.setTime(time);

    let data = key + "=" + val + ";";
    let expires = "expires=" + now.toUTCString() + ";";
    let path = "path=/" + ";";
    let httpOnly = "httpOnly" + ";";
    let SameSite = "SameSite=Strict" + ";";

    return data + expires + path + httpOnly + SameSite
}

export default async (req, res) => {
    if (req.method === 'POST' || req.method === 'GET') {
        //c3budiman delete session from redis
        const allSession = await delSession(req)
            .then(function handledResolved(response) {
                return response
            })
            .catch(function handleErrors(err) {
                return process.env.INFO_ERROR_CATCH
            })

        const cookies_data = [
            buildCookies(process.env.APPNAME, "")
        ];

        try {
            res.setHeader("Set-Cookie", cookies_data)
        } catch (error) {
        }

        return res.status(200).json({ code: 0, info: "Log Out Berhasil", data: [] })
    }
    else {
        // Handle any other HTTP method
        return res.status(401).json(
            {
                error: "Invalid Method"
            }
        )
    }
}
