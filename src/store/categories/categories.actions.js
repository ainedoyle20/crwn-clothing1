import CategoriesActionTypes from './categories.types';

export const setCategories = (categoriesArray) => ({
    type: CategoriesActionTypes.SET_CATEGORIES,
    payload: categoriesArray,
});
