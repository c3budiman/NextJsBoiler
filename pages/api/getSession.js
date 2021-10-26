// import axios from 'axios'
import { withSentry } from '@sentry/nextjs';
import { getSessionFromHeader } from '../../utils/server/helpers2.js'

async function handler(req, res) {
    try {
        let sessionUser = await getSessionFromHeader(req);
        return res.status(200).json(sessionUser)
    } catch (error) {
        console.log(error)
        return res.status(401).json(
            error
        )
    }
}

export default withSentry(handler);
