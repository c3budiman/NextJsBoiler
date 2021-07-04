import { getSessionFromHeader } from '../utils/helpers'

const withRoles = (handler, roles) => {
  return async (req, res) => {
    // get user roles : 
    let sessionUser = await getSessionFromHeader(req);
    // bandingkan dengan yg didefine di routes.
    if (!roles.includes(sessionUser?.data.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }

    return handler(req, res);
  };
};

export default withRoles;