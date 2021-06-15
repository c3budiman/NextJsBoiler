const defaultState = {
	isPending: true,
	image: null,
};

export default function dogReducer (state = defaultState, action) {
    switch (action.type) {
      case 'GET_DOG_PENDING': return defaultState;
  
      case 'GET_DOG_FULFILLED':
        return {
          isPending: false,
          image: action.payload.message,
        };
  
      default: return state;
    }
}
