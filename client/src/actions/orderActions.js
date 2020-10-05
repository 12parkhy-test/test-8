import { ADD_TO_CART, 
    CARTITEMS_LOADING, 
    GET_CARTITEMS, 
    DELETE_CARTITEM, 
    ADD_TO_ORDERHISTORY, 
    CLEAR_CART, 
    ORDERHISTORY_LOADING, 
    GET_ORDERHISTORY, 
    ORDERRESULT_LOADING, 
    GET_ORDERRESULT, 
    ORDERDETAIL_LOADING, 
    GET_ORDERDETAIL } from './types'
import axios from 'axios'
import {getErrors} from './errorActions'

export const changeCartItemsLoading = () => {
    return {
        type: CARTITEMS_LOADING
    }
}

export const getCartItems = () => (dispatch, getState) => {
    dispatch(changeCartItemsLoading())
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.get('/api/cart', config)
        .then((res) => {
            return dispatch({
                type: GET_CARTITEMS,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const addToCart = (productInfo) => (dispatch, getState) => {
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    const body = JSON.stringify(productInfo)
    axios.post('/api/cart', body, config)
        .then((res) => {
            return dispatch({
                type: ADD_TO_CART,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const deleteCartItem = (id) => (dispatch, getState) => {
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.delete(`/api/cart/${id}`, config)
        .then((res) => {
            return dispatch({
                type: DELETE_CARTITEM,
                payload: id
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const orderItems = (orderInfo) => (dispatch, getState) => {
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    const body = JSON.stringify(orderInfo)
    axios.post('/api/orders', body, config)
        .then((res) => {
            return dispatch({
                type: ADD_TO_ORDERHISTORY,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const changeOrderHistoryLoading = () => {
    return {
        type: ORDERHISTORY_LOADING
    }
}

export const getOrderHistory = () => (dispatch, getState) => {
    dispatch(changeOrderHistoryLoading())
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.get('/api/orders/history', config)
        .then((res) => {
            return dispatch({
                type: GET_ORDERHISTORY,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const changeOrderResultLoading = () => {
    return {
        type: ORDERRESULT_LOADING
    }
}

export const getOrderResult = () => (dispatch, getState) => {
    dispatch(changeOrderResultLoading())
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.get('/api/orders', config)
        .then((res) => {
            return dispatch({
                type: GET_ORDERRESULT,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const changeOrderDetailLoading = () => {
    return {
        type: ORDERDETAIL_LOADING
    }
}

export const getOrderDetail = (id) => (dispatch, getState) => {
    dispatch(changeOrderDetailLoading())
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.get(`/api/orders/order/${id}`, config)
        .then((res) => {
            console.log('payload', res.data)
            return dispatch({
                type: GET_ORDERDETAIL,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}





