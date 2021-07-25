import { rejectNull } from '../../../utils/helpers'
import { LoggerApiError } from '../../../utils/logger'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

async function handler(req, res) {
    let body = req.body
    try {
        let url = rejectNull(body.url, 'url', res);
        let input = rejectNull(body.input, 'input json', res);
        let output = rejectNull(body.output, 'output json', res);

        // in this example we use fs, to create filestream, and insert it into files.
        // you can use any other file system, like mongodb, postgre, elastic search etc.
        // you can enable it inside next.config.js
        if (serverRuntimeConfig.EnableLogging) {
            var insertlog = LoggerApiError(url, input, output)

            if (insertlog) {
                return res.status(200).json({
                    code: 0,
                    info: 'sukses log',
                })
            } else {
                return res.status(200).json({
                    code: 1,
                    info: 'unsukses log',
                })
            }
        } else {
            return res.status(200).json({
                code: 0,
                info: 'sukses log',
            })
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