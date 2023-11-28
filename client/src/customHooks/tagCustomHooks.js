import { useEffect, useReducer } from "react"
import getTagsReducer, { GET_TAGS_ACTION_TYPES, GET_TAGS_INITAL_STATE } from "../reducers/tag/getTagsReducer"
import { fetch_CreateTag, fetch_DeleteTag, fetch_GetTags, fetch_UpdateTag } from "../fetchFunctions/fetchTags";
import { CREATE_TAG_ACTIONS, CREATE_TAG_INITIAL_STATE, createTagReducer } from "../reducers/tag/createTagReducer";
import Swal from "sweetalert2";
import { UPDATE_TAG_ACTIONS, UPDATE_TAG_INITIAL_STATE, updateTagReducer } from "../reducers/tag/updateTagReducer";
import { DELETE_TAG_ACTIONS, DELETE_TAG_INITIAL_STATE, deleteTagReducer } from "../reducers/tag/deleteTagReducer";


export const useGetTagsReducer = () => {
    const [state, dispatch] = useReducer(getTagsReducer, GET_TAGS_INITAL_STATE);

    const Page_Encapsulated = {
        get: state.page,
        set: (page) => dispatch({ type: GET_TAGS_ACTION_TYPES.CHANGE_PAGE, payload: page })
    };

    const Size_Encapsulated = {
        get: state.size,
        set: (size) => dispatch({ type: GET_TAGS_ACTION_TYPES.CHANGE_PAGE, payload: size })
    };

    const TagContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: GET_TAGS_ACTION_TYPES.CHANGE_CONTENT, payload: content })
    };

    const PaginationList_Encapsulated = {
        get: state.paginationList,
        set: (paginationList) => dispatch({ type: GET_TAGS_ACTION_TYPES.CHANGE_PAGINATION_LIST, payload: paginationList })
    };

    const SelectedTag_Encapsulated = {
        get: state.selectedTag,
        set: (selectedTag) => dispatch({ type: GET_TAGS_ACTION_TYPES.CHANGE_SELECTED_TAG, payload: selectedTag })
    }

    useEffect(() => {
        dispatch({ type: GET_TAGS_ACTION_TYPES.FETCH_START });
        fetch_GetTags(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_TAGS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_TAGS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.page, state.size]);

    useEffect(() => {
        fetch_GetTags(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_TAGS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_TAGS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.content]);

    useEffect(() => {
        const totalPages = Math.ceil(state.tagsData.totalCount / state.size);
        const newPaginationList = [];
        for (let i = 1; i <= totalPages; i++) {
            newPaginationList.push({ number: i, isActive: i - 1 === state.page });
        }
        PaginationList_Encapsulated.set(newPaginationList);
    }, [state.page, state.tagsData, state.content]);

    const handle_PrevPage = () => {
        if (state.page > 0) {
            Page_Encapsulated.set(Page_Encapsulated.get - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    const handle_NextPage = () => {
        if (state.page < Math.ceil(state.tagsData.totalCount / state.size) - 1) {
            Page_Encapsulated.set(Page_Encapsulated.get + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    const handle_Pagination = (number, isActive) => {
        if (!isActive) {
            Page_Encapsulated.set(number - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return {
        loading: state.loading, tagsData: state.tagsData
        , TagContent_Encapsulated, handle_PrevPage, handle_NextPage, handle_Pagination, paginationList: PaginationList_Encapsulated.get, Page_Encapsulated, Size_Encapsulated, SelectedTag_Encapsulated
    };
}

export const useCreateTagReducer = () => {
    const [state, dispatch] = useReducer(createTagReducer, CREATE_TAG_INITIAL_STATE);

    const TagContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: CREATE_TAG_ACTIONS.CONTENT_CHANGE, payload: content })
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

    const createTag = () => {
        if (TagContent_Encapsulated.get === '') {
            dispatch({
                type: CREATE_TAG_ACTIONS.FETCH_ERROR,
                payload: { message: 'please fill content!' }
            })
        }
        else {
            dispatch({ type: CREATE_TAG_ACTIONS.FETCH_START });
            fetch_CreateTag(TagContent_Encapsulated.get)
                .then(response => response.success ?
                    dispatch({ type: CREATE_TAG_ACTIONS.FETCH_SUCCESS, payload: response })
                    : dispatch({ type: CREATE_TAG_ACTIONS.FETCH_ERROR, payload: { message: response.message } }))
                .catch(error => dispatch({ type: CREATE_TAG_ACTIONS.FETCH_ERROR, payload: error }));
        }
    }

    return { TagContent_Encapsulated, createTag };
}

export const useUpdateTagReducer = (tagContent, tagId) => {
    const [state, dispatch] = useReducer(updateTagReducer, UPDATE_TAG_INITIAL_STATE);

    const TagContent_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: UPDATE_TAG_ACTIONS.CONTENT_CHANGE, payload: content })
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

    useEffect(() => { TagContent_Encapsulated.set(tagContent) }, [])

    const updateTag = () => {
        if (TagContent_Encapsulated.get === '') {
            dispatch({
                type: UPDATE_TAG_ACTIONS.FETCH_ERROR,
                payload: { message: 'please fill content!' }
            })
        }
        else {
            dispatch({ type: UPDATE_TAG_ACTIONS.FETCH_START });
            fetch_UpdateTag(TagContent_Encapsulated.get, tagId)
                .then(response => response.success ?
                    dispatch({ type: UPDATE_TAG_ACTIONS.FETCH_SUCCESS, payload: response })
                    : dispatch({ type: UPDATE_TAG_ACTIONS.FETCH_ERROR, payload: { message: response.message } }))
                .catch(error => dispatch({ type: UPDATE_TAG_ACTIONS.FETCH_ERROR, payload: error }));
        }
    }

    return { TagContent_Encapsulated, updateTag };
}

export const useDeleteTagReducer = (tagId) => {

    const [state, dispatch] = useReducer(deleteTagReducer, DELETE_TAG_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.reload();
        }
    }, [state.success, state.successData])

    const deleteTag = () => {
        dispatch({ type: DELETE_TAG_ACTIONS.FETCH_START });
        fetch_DeleteTag(tagId)
            .then(response => response.success ?
                dispatch({ type: DELETE_TAG_ACTIONS.FETCH_SUCCESS, payload: { message: response.message } })
                : dispatch({ type: DELETE_TAG_ACTIONS.FETCH_ERROR, payload: { message: response.success } }))
            .catch(error => dispatch({ type: DELETE_TAG_ACTIONS.FETCH_ERROR, payload: error }));
    }

    return { deleteTag };

}