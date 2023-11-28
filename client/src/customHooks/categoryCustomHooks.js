import { useEffect, useReducer } from "react"
import getCategoriesReducer, { GET_CATEGORIES_ACTION_TYPES, GET_CATEGORIES_INITIAL_STATE } from "../reducers/category/getCategoriesReducer";
import { fetch_CreateCategory, fetch_DeleteCategory, fetch_GetCategories, fetch_UpdateCategory } from "../fetchFunctions/fetchCategories";
import { CREATE_CATEGORY_ACTIONS, CREATE_CATEGORY_INITIAL_STATE, createCategoryReducer } from "../reducers/category/createCategoryReducer";
import Swal from "sweetalert2";
import { UPDATE_CATEGORY_ACTIONS, UPDATE_CATEGORY_INITIAL_STATE, updateCateogyReducer } from "../reducers/category/updateCategoryReducer";
import { DELETE_CATEGORY_ACTIONS, DELETE_CATEGORY_INITIAL_STATE, deleteCategoryReducer } from "../reducers/category/deleteCategoryReducer";

export const useGetCategoryReducer = () => {
    const [state, dispatch] = useReducer(getCategoriesReducer, GET_CATEGORIES_INITIAL_STATE);

    const CategoryContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: GET_CATEGORIES_ACTION_TYPES.CHANGE_CONTENT, payload: content })
    };

    const FileteredCategories_Encapsulated = {
        get: state.filteredCategoriesData,
        set: (filteredCategoriesData) => dispatch({ type: GET_CATEGORIES_ACTION_TYPES.CHANGE_FILTERED_CATEGORIES, payload: filteredCategoriesData })
    };

    useEffect(() => {
        dispatch({ type: GET_CATEGORIES_ACTION_TYPES.FETCH_START });
        fetch_GetCategories()
            .then(response => dispatch({ type: GET_CATEGORIES_ACTION_TYPES.FETCH_SUCCESS, payload: response }))
            .catch(error => dispatch({ type: GET_CATEGORIES_ACTION_TYPES.FETCH_ERROR, payload: error }))
    }, []);

    useEffect(() => {
        FileteredCategories_Encapsulated.set(state.content === ''
            ? state.categoriesData : state.categoriesData.filter((categoryData) => categoryData.category.content.toLowerCase().replace(/\s+/g, '').includes(state.content.toLowerCase().replace(/\s+/g, ''))));
    }, [state.content]);

    return { categoryLoading: state.loading, CategoryContent_Encapsulated, FileteredCategories_Encapsulated }
}

export const useCreateCategoryReducer = () => {
    const [state, dispatch] = useReducer(createCategoryReducer, CREATE_CATEGORY_INITIAL_STATE);

    const CategoryContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: CREATE_CATEGORY_ACTIONS.CONTENT_CHANGE, payload: content })
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message })
    }, [state.error, state.errorData])

    const createCategory = () => {
        if (CategoryContent_Encapsulated.get === '') {
            dispatch({
                type: CREATE_CATEGORY_ACTIONS.FETCH_ERROR, payload: { message: 'please fill content!' }
            })
        }
        else {
            dispatch({ type: CREATE_CATEGORY_ACTIONS.FETCH_START });
            fetch_CreateCategory(state.content)
                .then(response => response.success ?
                    dispatch({ type: CREATE_CATEGORY_ACTIONS.FETCH_SUCCESS, payload: response })
                    : dispatch({ type: CREATE_CATEGORY_ACTIONS.FETCH_ERROR, payload: { message: response.message } })
                )
                .catch(error => dispatch({ type: CREATE_CATEGORY_ACTIONS.FETCH_ERROR, payload: error }));
        }
    }

    return { ...state, CategoryContent_Encapsulated, createCategory }
}

export const useUpdateCategoryReducer = (categoryContent, categoryId) => {

    const [state, dispatch] = useReducer(updateCateogyReducer, UPDATE_CATEGORY_INITIAL_STATE);

    const CategoryContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: UPDATE_CATEGORY_ACTIONS.CONTENT_CHANGE, payload: content })
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.reload();
        }
    }, [state.success, state.successData])

    useEffect(() => { CategoryContent_Encapsulated.set(categoryContent) }, [])

    const updateCategory = () => {
        if (CategoryContent_Encapsulated.get === '') {
            dispatch({
                type: UPDATE_CATEGORY_ACTIONS.FETCH_ERROR,
                payload: { message: 'please fill content!' }
            })
        }
        else {
            dispatch({ type: UPDATE_CATEGORY_ACTIONS.FETCH_START });
            fetch_UpdateCategory(CategoryContent_Encapsulated.get, categoryId)
                .then(response => response.success ?
                    dispatch({ type: UPDATE_CATEGORY_ACTIONS.FETCH_SUCCESS, payload: response })
                    : dispatch({ type: UPDATE_CATEGORY_ACTIONS.FETCH_ERROR, payload: { message: response.message } }))
                .catch(error => dispatch({ type: UPDATE_CATEGORY_ACTIONS.FETCH_ERROR, payload: error }));
        }
    }

    return { CategoryContent_Encapsulated, updateCategory };
}

export const useDeleteCategoryReducer = (categoryId) => {

    const [state, dispatch] = useReducer(deleteCategoryReducer, DELETE_CATEGORY_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.reload();
        }
    }, [state.success, state.successData])

    const deleteCategory = () => {
        dispatch({ type: DELETE_CATEGORY_ACTIONS.FETCH_START });
        fetch_DeleteCategory(categoryId)
            .then(response => response.success ?
                dispatch({ type: DELETE_CATEGORY_ACTIONS.FETCH_SUCCESS, payload: { message: response.message } })
                : dispatch({ type: DELETE_CATEGORY_ACTIONS.FETCH_ERROR, payload: { message: response.success } }))
            .catch(error => dispatch({ type: DELETE_CATEGORY_ACTIONS.FETCH_ERROR, payload: error }));
    }

    return { deleteCategory };
}