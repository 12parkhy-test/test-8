import {
    ADD_TO_CART,
    CARTITEMS_LOADING,
    GET_CARTITEMS,
    DELETE_CARTITEM,
    ADD_TO_ORDERHISTORY,
    CLEAR_CART,
    ORDERITEMS_LOADING,
    ORDERHISTORY_LOADING,
    GET_ORDERHISTORY,
    ORDERRESULT_LOADING,
    GET_ORDERRESULT,
    ORDERDETAIL_LOADING,
    GET_ORDERDETAIL,
    ADD_TO_CHECKOUT,
    CLEAR_CHECKOUT
} from '../actions/types'

const initialState = {
    cartItems: [],
    orderHistory: [],
    orderResult: {},
    orderDetail: {},
    checkout: '',
    cartItemsIsLoading: false,
    orderHistoryIsLoading: false,
    orderResultIsLoading: false,
    orderDetailIsLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARTITEMS:
            return {
                ...state,
                cartItems: action.payload,
                cartItemsIsLoading: false
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...action.payload, ...state.cartItems]
            };
        case DELETE_CARTITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => {
                    return cartItem.productId !== action.payload
                })
            };
        case ADD_TO_ORDERHISTORY:
            return {
                ...state,
                orderHistory: [...action.payload, ...state.orderHistory]
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        case ADD_TO_CHECKOUT:
            return {
                ...state,
                checkout: 'action.payload'
            };
        case CLEAR_CHECKOUT:
            return {
                ...state,
                checkout: ''
            };
        case CARTITEMS_LOADING:
            return {
                ...state,
                cartItemsIsLoading: true
            };
        case GET_ORDERHISTORY:
            return {
                ...state,
                orderHistory: action.payload,
                orderHistoryIsLoading: false
            };
        case ORDERHISTORY_LOADING:
            return {
                ...state,
                orderHistoryIsLoading: true
            };
        case GET_ORDERRESULT:
            return {
                ...state,
                orderResult: action.payload,
                orderResultIsLoading: false
            };
        case ORDERRESULT_LOADING:
            return {
                ...state,
                orderResultIsLoading: true
            };
        case GET_ORDERDETAIL:
            return {
                ...state,
                orderDetail: action.payload,
                orderDetailIsLoading: false
            };
        case ORDERDETAIL_LOADING:
            return {
                ...state,
                orderDetailIsLoading: true
            };
        default:
            return state;
    }
}