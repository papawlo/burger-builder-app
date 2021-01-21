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

export const auth = (email, password, isSignup) => {

    console.log(email, password, isSignup);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-t69nBJKS7toGFbCHCiqoJ8vt3bSTYRA';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-t69nBJKS7toGFbCHCiqoJ8vt3bSTYRA';
        }
        axios.post(
            url,
            authData
        ).then(response => {
            console.log("🚀 ~ file: auth.js ~ line 43 ~ auth ~ response", response)
            dispatch(authSuccess(response.data))
        }).catch(err => {
            console.log("🚀 ~ file: auth.js ~ line 46 ~ auth ~ err", err)
            console.log(err);
            dispatch(authFail(err));
        });
    }
}