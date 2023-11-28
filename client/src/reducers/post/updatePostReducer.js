export const UPDATE_POST_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    content: '',
    title: "",
    description: "",
    category: "",
    tags: [],
    success: false,
    successData: {}
};

export const UPDATE_POST_ACTIONS = {
    CONTENT_CHANGE: "CONTENT_CHANGE",
    TITLE_CHANGE: "TITLE_CHANGE",
    DESCRIPTION_CHANGE: "DESCRIPTION_CHANGE",
    TAGS_CHANGE: "TAGS_CHANGE",
    CATEGORY_CHANGE: "CHANGE_CATEGORY",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CLEAR: "CLEAR",
    INITIALIZE_VALUES: "INITIALIZE_VALUES"
}

export const updatePostReducer = (state = UPDATE_POST_INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_POST_ACTIONS.CONTENT_CHANGE:
            return { ...state, content: action.payload };
        case UPDATE_POST_ACTIONS.TITLE_CHANGE:
            return { ...state, title: action.payload };
        case UPDATE_POST_ACTIONS.DESCRIPTION_CHANGE:
            return { ...state, description: action.payload };
        case UPDATE_POST_ACTIONS.TAGS_CHANGE:
            return { ...state, tags: action.payload };
        case UPDATE_POST_ACTIONS.CATEGORY_CHANGE:
            return { ...state, category: action.payload };
        case UPDATE_POST_ACTIONS.FETCH_START:
            return { ...state, loading: true };
        case UPDATE_POST_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case UPDATE_POST_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        case UPDATE_POST_ACTIONS.INITIALIZE_VALUES:
            return {
                ...state, loading: false, error:false ,
                content: action.payload.content,
                description: action.payload.description,
                title: action.payload.title,
                tags: action.payload.tags,
                category: action.payload.category,
            }
        case UPDATE_POST_ACTIONS.CLEAR:
            return UPDATE_POST_INITIAL_STATE
        default:
            return state;
    }
};