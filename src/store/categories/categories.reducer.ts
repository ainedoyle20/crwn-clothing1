import { AnyAction } from 'redux';

import { Category } from './categories.types';

import { fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.actions';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesReducer = (state=CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    } else if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: null,
            categories: action.payload,
        }
    } else if (fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        }
    }

    return state;
}

export default categoriesReducer;
