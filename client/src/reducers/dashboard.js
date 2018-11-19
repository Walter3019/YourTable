import { 
    DASHBOARD_GET_DATA,
} from '../actions/types'

const DEFAULT_STATE = {
    secret: '',
}

export default (state = DEFAULT_STATE, action) => {

    const { type, payload } = action;

    switch (type) {

        case DASHBOARD_GET_DATA:

            return {
                ...state,
                secret: payload,
            }

        default:
            return state;
    }

    
}