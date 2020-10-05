import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING } from './types'
import axios from 'axios'
import {getErrors} from './errorActions'

export const getProducts = () => (dispatch, getState) => {
    dispatch(changeProductsLoading())
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.get('/api/products', config)
        .then((res) => {
            return dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const deleteProduct = (id) => (dispatch, getState) => {
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.delete(`/api/products/${id}`, config)
        .then((res) => {
            return dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const addProduct = (product) => (dispatch, getState) => {
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    axios.post('/api/products', product, config)
        .then((res) => {
            return dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            })
        })
        .catch((error) => {
            return dispatch(getErrors(error.response.data, error.response.status))
        })
}

export const changeProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}