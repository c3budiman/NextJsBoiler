const defaultState = {
    isPending: true,
    data: null,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case 'POST_LOGIN': return defaultState;

        case 'POST_LOGIN_FULFILLED':
            return {
                isPending: false,
                data: action.payload,
            };

        default: return state;
    }
}
