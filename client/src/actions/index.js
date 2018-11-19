import axios from 'axios';

import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN, DASHBOARD_GET_DATA } from './types';

export const oauthGoogle = data => {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:5000/users/oauth/google', {
                access_token: data
            });
            console.log('res', res);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (error) {
            
        }
    }
}

export const oauthFacebook = data => {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:5000/users/oauth/facebook', {
                access_token: data
            });
            console.log('res', res);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (error) {
            
        }
    }
}

export const signIn = (data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('http://localhost:5000/users/signin', data);
            console.log('sign in res: ', res);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            axios.defaults.headers.common['Authorization'] = res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Email and password combination isn't valid"
            });
        }
    }
}

export const signUp = (data) => {
    return async (dispatch) => {
        // 1. Use the data and to make HTTP request to our Back-end and send it along
        // 2. Take the BE's response (jwt is here now)
        // 3. Dispatch 'user just signed up' (with jwttoke)
        // 4. Save the jwtToken into our localStorage
        try {
            const res = await axios.post('http://localhost:5000/users/signup', data);
            console.log('res', res);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token,
            });

            axios.defaults.headers.common['Authorization'] = res.data.token;

            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch (error) {

            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use.'
            });
            console.log(error);
        }
    }
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    }
}

export const getSecret = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('http://localhost:5000/users/secret');
            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })
        } catch (error) {
            console.log(error);
        }
    }
}