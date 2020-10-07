import axios from 'axios'
import { USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL,
    USERS_LOADING,
    USERS_LOADED } from './types'
import { getErrors } from './errorActions'

export const getUser = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    await axios.get('/api/users/user', config)
        .then((res) => {
            return dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch(getErrors(error.response.data, error.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const getUsers = () => async (dispatch, getState) => {
    dispatch({
        type: USERS_LOADING
    })
    const token = getState().authentication.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    await axios.get('/api/users/', config)
        .then((res) => {
            return dispatch({
                type: USERS_LOADED,
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch(getErrors(error.response.data, error.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const signup = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password })
    await axios.post('/api/users', body, config)
        .then((res) => {
            return dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch(getErrors(error.response.data, error.response.status, 'SIGNUP_FAIL'))
            dispatch({
                type: SIGNUP_FAIL
            })
        })
}

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    await axios.post('/api/users/login', body, config)
        .then((res) => {
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch(getErrors(error.response.data, error.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}