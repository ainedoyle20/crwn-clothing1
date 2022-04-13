import CategoriesActionTypes from './categories.types';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () => ({
    type: CategoriesActionTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categoriesArray) => ({
    type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categoriesArray,
});

export const fetchCategoriesFailed = (error) => ({
    type: CategoriesActionTypes.FETCH_CATEGORIES_FAILED,
    payload: error.message
});

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}