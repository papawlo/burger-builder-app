import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = (...args) => {
    console.log(args);
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    console.log(email, password);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-t69nBJKS7toGFbCHCiqoJ8vt3bSTYRA',
            authData
        ).then(response => {
            dispatch(authSuccess(response.data))
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    }
}