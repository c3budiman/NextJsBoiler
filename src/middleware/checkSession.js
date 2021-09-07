import { getSessionFromHeader } from '../utils/helpers'


const checkSession = (handler) => {
    return async (req, res) => {
        console.log('checking session...')
        let sessionUser = await getSessionFromHeader(req);
        if (sessionUser.code != 0) {
            console.log('userdont have session');
            return res.status(401).json({
                code: sessionUser.code,
                info: sessionUser.info,
            })
        }

        return handler(req, res);
    };
};

export default checkSession;