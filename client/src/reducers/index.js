import { combineReducers } from 'redux'
import productReducer from './productReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import orderReducer from './orderReducer'

export default combineReducers({
    product: productReducer,
    authentication: authReducer,
    error: errorReducer,
    order: orderReducer
})