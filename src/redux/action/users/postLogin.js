import { FetcherPost } from "../../../utils/fetcher";

export const postLogin = (username, password) => ({
    type: 'POST_LOGIN',
    payload: FetcherPost('/api/auth/signin', {
        "username": username,
        "password": password,
    })
});