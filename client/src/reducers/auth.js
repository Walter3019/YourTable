import { 
    AUTH_SIGN_UP, 
    AUTH_ERROR, 
    AUTH_SIGN_OUT, 
    AUTH_SIGN_IN 
} from '../actions/types'

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: '',
}

export default (state = DEFAULT_STATE, action) => {

    const { type, payload } = action;

    switch (type) {

        case AUTH_SIGN_IN:

            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                errorMessage: '',
            }

        case AUTH_SIGN_UP:
        
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                errorMessage: '',
            };

        case AUTH_ERROR:
        
            return {
                ...state,
                errorMessage: payload
            }
    
        case AUTH_SIGN_OUT: 

            return {
                ...state,
                token: payload,
                isAuthenticated: false,
                errorMessage: '',
            }
        default:
            return state;
    }

    
}