const defaultState = {
    isPending: true,
    state: 'noauth',
    data: null,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'POST_LOGIN': return defaultState;

        case 'POST_LOGIN_PENDING':
            return {
                isPending: true,
                state: 'loading',
                data: null,
            }

        case 'POST_LOGIN_FULFILLED':
            if (action.payload?.data?.code == 0) {
                return {
                    isPending: false,
                    state: 'auth',
                    data: action.payload?.data,
                };
            }
            else {
                return {
                    isPending: false,
                    state: 'error',
                    data: action.payload?.data,
                };
            }

        case 'GET_PROFILE':
            return defaultState;

        case 'GET_PROFILE_PENDING':
            return {
                isPending: true,
                state: 'loading',
                data: null,
            };

        case 'GET_PROFILE_FULFILLED':
            if (action.payload?.data?.code == 0) {
                return {
                    isPending: false,
                    state: 'auth',
                    data: action.payload?.data,
                };
            }
            else {
                return {
                    isPending: false,
                    state: 'error',
                    data: action.payload?.data,
                };
            }

        default: return state;
    }
}
