import CategoriesActionTypes from './categories.types';

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoriesActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            }
        case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                categories: action.payload,
            }
        case CategoriesActionTypes.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default categoriesReducer;
