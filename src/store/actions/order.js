import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

export const purchaseBurgerSuccess = (id, oderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        oderData: oderData
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data, orderData
                ))
            }
            ).catch(error => {
                console.log('error', error);
                dispatch(purchaseBurgerFail(error));
            });
    }


}
