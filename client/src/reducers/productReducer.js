import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING } from '../actions/types'

const initialState = {
    products: [],
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                isLoading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => {
                    return product._id !== action.payload
                })
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}