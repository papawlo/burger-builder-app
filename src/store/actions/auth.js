import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
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
            console.log("🚀 ~ file: auth.js ~ line 43 ~ auth ~ response", response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        }).catch(err => {
            console.log("🚀 ~ file: auth.js ~ line 46 ~ auth ~ err", err);
            dispatch(authFail(err.response.data.error));
        });
    }
}