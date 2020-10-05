import { GET_ERRORS, CLEAR_ERRORS } from './types'

export const getErrors = (msg, status, type = null) => {
    return {
        type: GET_ERRORS,
        payload: { content: msg.msg, status, type }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}