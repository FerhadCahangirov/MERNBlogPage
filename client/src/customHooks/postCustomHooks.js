import { useEffect, useReducer } from "react"
import { getPostsReducer, GET_POSTS_INITIAL_STATE, GET_POSTS_ACTION_TYPES } from "../reducers/post/getPostsReducer"
import { fetch_GetPosts, fetch_CreatePost, fetch_GetPost, fetch_UpdatePost, fetch_UploadPostImage, fetch_RemovePostImage, fetch_DeletePost, fetch_LikePost } from "../fetchFunctions/fetchPosts";
import { CREATE_POST_ACTIONS, CREATE_POST_INITIAL_STATE, createPostReducer } from "../reducers/post/createPostReducer";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { GET_POST_ACTION_TYPES, GET_POST_INITIAL_STATE, getPostReducer } from "../reducers/post/getPostReducer";
import { UPDATE_POST_ACTIONS, UPDATE_POST_INITIAL_STATE, updatePostReducer } from "../reducers/post/updatePostReducer";
import { DELETE_POST_ACTIONS, DELETE_POST_INITIAL_STATE, deletePostReducer } from "../reducers/post/deletePostReducer";
import { LIKE_POST_ACTION_TYPES, LIKE_POST_INITIAL_STATE, likePostReducer } from "../reducers/post/likePostReducer";
import { askForAuthorization_DialogFire } from "../utils/dialogs";
import { ADD_COMMENT_INITIAL_STATE, addCommentReducer } from "../reducers/post/addCommentReducer";

const validation = (title, category, content) => {
    let result =
        title === ''
            ? { success: false, message: "Please fill the title !" }
            : category === ''
                ? { success: false, message: "Please select any category !" }
                : content === '' || content === '<p><br></p>'
                    ? { success: false, message: "Please fill paragraph content !" }
                    : { success: true, message: "" };
    return result;
};

export const useGetPostsReducer = () => {

    const [state, dispatch] = useReducer(getPostsReducer, GET_POSTS_INITIAL_STATE);

    const Page_Encapsulated = {
        get: state.page,
        set: (page) => dispatch({ type: GET_POSTS_ACTION_TYPES.CHANGE_PAGE, payload: page })
    }

    const Size_Encapsulated = {
        get: state.size,
        set: (size) => dispatch({ type: GET_POSTS_ACTION_TYPES.CHANGE_PAGE, payload: size })
    }

    const Content_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: GET_POSTS_ACTION_TYPES.CHANGE_CONTENT, payload: content })
    }

    const PaginationList_Encapsulated = {
        get: state.paginationList,
        set: (paginationList) => dispatch({ type: GET_POSTS_ACTION_TYPES.PAGINATION_LIST_CHANGE, payload: paginationList })
    }

    useEffect(() => {
        dispatch({ type: GET_POSTS_ACTION_TYPES.FETCH_START });
        fetch_GetPosts(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_POSTS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_POSTS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.page, state.size])

    useEffect(() => {
        fetch_GetPosts(state.page, state.size, state.content)
            .then(data => dispatch({ type: GET_POSTS_ACTION_TYPES.FETCH_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: GET_POSTS_ACTION_TYPES.FETCH_ERROR, payload: error }));
    }, [state.content])

    useEffect(() => {
        const totalPages = Math.ceil(state.postsData.totalCount / state.size);
        const newPaginationList = [];
        for (let i = 1; i <= totalPages; i++) {
            newPaginationList.push({ number: i, isActive: i - 1 === state.page });
        }
        PaginationList_Encapsulated.set(newPaginationList);
    }, [state.page, state.postsData, state.content]);

    const handle_PrevPage = () => {
        if (state.page > 0) {
            Content_Encapsulated.set(Content_Encapsulated.get - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    const handle_NextPage = () => {
        if (state.page < Math.ceil(state.postsData.totalCount / state.size) - 1) {
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
        error: state.error, errorData: state.errorData, loading: state.loading, postsData: state.postsData
        , Content_Encapsulated, handle_PrevPage, handle_NextPage, handle_Pagination, paginationList: PaginationList_Encapsulated.get, Page_Encapsulated, Size_Encapsulated
    };
}

export const useCreatePostReducer = () => {
    const [state, dispatch] = useReducer(createPostReducer, CREATE_POST_INITIAL_STATE);

    const createPost = async () => {
        const validationResult = validation(state.title, state.category, state.content);

        if (validationResult.success) {
            dispatch({ type: CREATE_POST_ACTIONS.FETCH_START })
            const data = {
                "title": state.title, "description": state.description, "content": state.content, "category_id": state.category.category._id, "tags": state.tags.map(tag => { return { tag_id: tag._id } })
            };

            fetch_CreatePost(data)
                .then(response => {
                    if (response.success) {
                        dispatch({ type: CREATE_POST_ACTIONS.FETCH_SUCCESS, payload: { message: response.message } });
                        dispatch({ type: CREATE_POST_ACTIONS.CLEAR });
                    }
                    else {
                        dispatch({ type: CREATE_POST_ACTIONS.FETCH_ERROR, payload: { message: response.message } })
                    }
                })
                .catch(error => dispatch({ type: CREATE_POST_ACTIONS.FETCH_ERROR, payload: error }))
        }
        else dispatch({ type: CREATE_POST_ACTIONS.FETCH_ERROR, payload: { message: validationResult.message } });
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
        state.success && Swal.fire({ icon: 'success', title: state.successData.message });

    }, [state.error, state.errorData, state.success, state.successData])

    const Title_Encapsulated = {
        get: state.title,
        set: (title) => dispatch({ type: CREATE_POST_ACTIONS.TITLE_CHANGE, payload: title })
    };

    const Description_Encapsulated = {
        get: state.description,
        set: (description) => dispatch({ type: CREATE_POST_ACTIONS.DESCRIPTION_CHANGE, payload: description })
    };

    const Content_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: CREATE_POST_ACTIONS.CONTENT_CHANGE, payload: content })
    };

    const Tags_Encapsulated = {
        get: state.tags,
        set: (tags) => dispatch({ type: CREATE_POST_ACTIONS.TAGS_CHANGE, payload: tags })
    };

    const Category_Encapsulated = {
        get: state.category,
        set: (category) => dispatch({ type: CREATE_POST_ACTIONS.CATEGORY_CHANGE, payload: category })
    };

    return { ...state, createPost, Title_Encapsulated, Description_Encapsulated, Content_Encapsulated, Tags_Encapsulated, Category_Encapsulated }
}

export const useGetPostReducer = (postId) => {

    const [state, dispatch] = useReducer(getPostReducer, GET_POST_INITIAL_STATE);

    useEffect(() => {
        dispatch({ type: GET_POST_ACTION_TYPES.FETCH_START });
        fetch_GetPost(postId).then(response => dispatch({ type: GET_POST_ACTION_TYPES.FETCH_SUCCESS, payload: response }))
            .catch(error => dispatch({ type: GET_POST_ACTION_TYPES.FETCH_ERROR, payload: error }))
    }, []);


    return { postData: state.postData, loading: state.loading, success: state.success };
}

export const useUpdatePostReducer = (postId, postData = {}) => {

    const [state, dispatch] = useReducer(updatePostReducer, UPDATE_POST_INITIAL_STATE);

    const Title_Encapsulated = {
        get: state.title,
        set: (title) => dispatch({ type: CREATE_POST_ACTIONS.TITLE_CHANGE, payload: title })
    };

    const Description_Encapsulated = {
        get: state.description,
        set: (description) => dispatch({ type: CREATE_POST_ACTIONS.DESCRIPTION_CHANGE, payload: description })
    };

    const Content_Encapsulated = {
        get: state.content,
        set: (content) => dispatch({ type: CREATE_POST_ACTIONS.CONTENT_CHANGE, payload: content })
    };

    const Tags_Encapsulated = {
        get: state.tags,
        set: (tags) => dispatch({ type: CREATE_POST_ACTIONS.TAGS_CHANGE, payload: tags })
    };

    const Category_Encapsulated = {
        get: state.category,
        set: (category) => dispatch({ type: CREATE_POST_ACTIONS.CATEGORY_CHANGE, payload: category })
    };

    useEffect(() => {
        console.log(state.error)
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message, text: state.errorData.stack && state.errorData.stack });
    }, [state.error, state.errorData])

    useEffect(() => {
        state.success && Swal.fire({ icon: 'success', title: state.successData.message });
    }, [state.success, state.successData])

    const updatePost = () => {
        const validationResult = validation(state.title, state.category, state.content);
        if (!validationResult.success) {
            dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: { message: validationResult.message } });
        } else {
            console.log(state.category)
            const data = {
                "title": state.title, "description": state.description, "content": state.content, "category_id": state.category._id ? state.category._id : state.category.category._id, "tags": state.tags.map(tag => { return { tag_id: tag._id } })
            };
            console.log("<><><><><> Data <><><><><> : ", data, state.category);
            dispatch({ type: UPDATE_POST_ACTIONS.FETCH_START });
            fetch_UpdatePost(data, postId).then(response => response.success ?
                dispatch({ type: UPDATE_POST_ACTIONS.FETCH_SUCCESS, payload: response.message }) : dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: { message: response.message } }))
                .catch(error => dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: { message: error.message } }));
        }

    }

    const initializeValues = (title, description, content, tags, category) => {
        dispatch({ type: UPDATE_POST_ACTIONS.FETCH_START });
        dispatch({ type: UPDATE_POST_ACTIONS.INITIALIZE_VALUES, payload: { title: title, description: description, content: content, category: category, tags: tags } });
    }

    useEffect(() => {
        initializeValues(postData.title, postData.description, postData.content, postData.tags, postData.category);
    }, [postData.title, postData.description, postData.content, postData.tags, postData.category]);

    const uploadFile = (fileData) => {
        dispatch({ type: UPDATE_POST_ACTIONS.FETCH_START });
        fetch_UploadPostImage(fileData, postId)
            .then(response => {
                if (response.succes) {
                    dispatch({ type: UPDATE_POST_ACTIONS.FETCH_SUCCESS, payload: response.message });
                    window.location.reload();
                }
                else dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: response })
            })
            .catch(error => dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: error }));
    }

    const removeFile = () => {
        Swal.fire({
            title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: UPDATE_POST_ACTIONS.FETCH_START });
                fetch_RemovePostImage(postId)
                    .then(response => {
                        if (response.success) {
                            dispatch({ type: UPDATE_POST_ACTIONS.FETCH_SUCCESS, payload: response.message })
                            window.location.reload();
                        }
                        else dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: response })
                    })
                    .catch(error => dispatch({ type: UPDATE_POST_ACTIONS.FETCH_ERROR, payload: error }));
            }
        })
    }

    return { Title_Encapsulated, Description_Encapsulated, Content_Encapsulated, Tags_Encapsulated, Category_Encapsulated, updatePost, initializeValues, uploadFile, removeFile }
}


export const useDeletePostReducer = (postId) => {

    const [state, dispatch] = useReducer(deletePostReducer, DELETE_POST_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.reload();
        }
    }, [state.success, state.successData])

    const deletePost = () => {
        Swal.fire({
            title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: DELETE_POST_ACTIONS.FETCH_START });
                fetch_DeletePost(postId)
                    .then(response => response.success ?
                        dispatch({ type: DELETE_POST_ACTIONS.FETCH_SUCCESS, payload: { message: response.message } })
                        : dispatch({ type: DELETE_POST_ACTIONS.FETCH_ERROR, payload: { message: response.success } }))
                    .catch(error => dispatch({ type: DELETE_POST_ACTIONS.FETCH_ERROR, payload: error }));
            }
        })
    }

    return { deletePost };
}

export const useLikePostReducer = (postLikeButtonRef) => {
    const [state, dispatch] = useReducer(likePostReducer, LIKE_POST_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {

        const likeBtn = postLikeButtonRef.current;

        if (state.successData.success === true) {
            if (state.successData.message === "liked") {
                likeBtn.classList.add('active');
                likeBtn.innerHTML = `<i class="fas fa-heart mr-2"></i> ${parseInt(likeBtn.textContent) + 1}`;
            } else if (state.successData.message === "unliked") {
                likeBtn.classList.remove('active');
                likeBtn.innerHTML = `<i class="fas fa-heart mr-2"></i> ${parseInt(likeBtn.textContent) - 1}`;
            }
        }
        else if (state.successData.message === 'unauthorized')
            askForAuthorization_DialogFire();
    }, [state.successData])

    const likePost = (postId) => {
        dispatch({ type: LIKE_POST_ACTION_TYPES.FETCH_START });
        fetch_LikePost(postId)
            .then(response => dispatch({ type: LIKE_POST_ACTION_TYPES.FETCH_SUCCESS, payload: response }))
            .catch(error => dispatch({ type: LIKE_POST_ACTION_TYPES.FETCH_ERROR, payload: error }))
    }

    return { likePost }
}

export const useAddCommentReducer = () => {
    const [state, dispatch] = useReducer(addCommentReducer, ADD_COMMENT_INITIAL_STATE);

    

}
