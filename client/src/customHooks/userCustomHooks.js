import { GET_USERS_ACTION_TYPES, GET_USERS_INITIAL_STATE, getUsersReducer } from "../reducers/user/getUsersReducer"
import { useEffect, useReducer } from 'react';
import { fetch_DeleteUser, fetch_GetUsers } from '../fetchFunctions/fetchUsers';
import { DELETE_USER_ACTIONS, DELETE_USER_INITIAL_STATE, deleteUserReducer } from "../reducers/user/deleteUserReducer";
import Swal from "sweetalert2";


export const useGetUsersReducer = () => {
    const [state, dispatch] = useReducer(getUsersReducer, GET_USERS_INITIAL_STATE);

    const Page_Encapsulated = {
        get: state.page,
        set: (page) => dispatch({ type: GET_USERS_ACTION_TYPES.CHANGE_PAGE, payload: page })
    }

    const Size_Encapsulated = {
        get: state.size,
        set: (size) => dispatch({ type: GET_USERS_ACTION_TYPES.CHANGE_PAGE, payload: size })
    }

    const Content_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: GET_USERS_ACTION_TYPES.CHANGE_CONTENT, payload: content })
    }

    const PaginationList_Encapsulated = {
        get: state.paginationList,
        set: (paginationList) => dispatch({ type: GET_USERS_ACTION_TYPES.PAGINATION_LIST_CHANGE, payload: paginationList })
    }

    useEffect(() => {
        dispatch({ type: GET_USERS_ACTION_TYPES.FETCH_START });
        fetch_GetUsers(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_USERS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_USERS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.page, state.size])

    useEffect(() => {
        fetch_GetUsers(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_USERS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_USERS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.content])

    useEffect(() => {
        const totalPages = Math.ceil(state.usersData.totalCount / state.size);
        const newPaginationList = [];
        for (let i = 1; i <= totalPages; i++) {
            newPaginationList.push({ number: i, isActive: i - 1 === state.page });
        }
        PaginationList_Encapsulated.set(newPaginationList);
    }, [state.page, state.usersData, state.content]);

    const handle_PrevPage = () => {
        if (state.page > 0) {
            Content_Encapsulated.set(Content_Encapsulated.get - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    const handle_NextPage = () => {
        if (state.page < Math.ceil(state.usersData.totalCount / state.size) - 1) {
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
        error: state.error, errorData: state.errorData, loading: state.loading, usersData: state.usersData
        , Content_Encapsulated, handle_PrevPage, handle_NextPage, handle_Pagination, paginationList: PaginationList_Encapsulated.get, Page_Encapsulated, Size_Encapsulated
    };

}

export const useDeleteUserReducer = (userId) => {

    const [state, dispatch] = useReducer(deleteUserReducer, DELETE_USER_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.reload();
        }
    }, [state.success, state.successData])

    const deleteuser = () => {
        dispatch({ type: DELETE_USER_ACTIONS.FETCH_START });
        fetch_DeleteUser(userId)
            .then(response => response.success ?
                dispatch({ type: DELETE_USER_ACTIONS.FETCH_SUCCESS, payload: { message: response.message } })
                : dispatch({ type: DELETE_USER_ACTIONS.FETCH_ERROR, payload: { message: response.success } }))
            .catch(error => dispatch({ type: DELETE_USER_ACTIONS.FETCH_ERROR, payload: error }));
    }

    return { deleteuser };

}

