import { FetcherPost } from "../../../utils/fetcher";

export const getProfile = () => ({
    type: 'GET_PROFILE',
    payload: FetcherPost('/api/users/profile')
});