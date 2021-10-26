import { getSessionFromHeader } from "./server/helpers2";

export const handleSessions = async (ctx, needLogin = true) => {
    let sessionUser = await getSessionFromHeader(ctx.req);
    if (sessionUser.code == 0) {
        return { props: { session: sessionUser } }
    } else {
        if (needLogin) {
            return {
                redirect: {
                    destination: '/login?code=2',
                    permanent: false,
                },
            }
        } else {
            return { props: { session: { code: '-1' } } }
        }
    }
}